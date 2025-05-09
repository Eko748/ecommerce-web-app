'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { fetchProducts } from '@/lib/api'
import { useInView } from 'react-intersection-observer'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

type ListProps = {
    initial: Product[]
    keyword: string
}

const OFFSET = 10

export default function ProductList({ initial, keyword }: ListProps) {
    const [page, setPage] = useState(1)
    const [data, setData] = useState<Product[]>(initial)
    const [isEnd, setIsEnd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { ref, inView } = useInView()
    const router = useRouter()
    const params = useSearchParams()

    // Mengatur data baru berdasarkan keyword
    useEffect(() => {
        setData(initial)
        setPage(2)
        setIsEnd(false)
    }, [initial, keyword])

    useEffect(() => {
        const loadMore = async () => {
            if (isLoading || isEnd) return
            setIsLoading(true)

            try {
                const response = await fetchProducts({ page, limit: OFFSET, keyword })
                const newData = response.data || []

                if (newData.length === 0) {
                    setIsEnd(true)
                    return
                }

                setData((prevData) => {
                    const existingIds = new Set(prevData.map((p) => p.id))
                    const filteredNewData = newData.filter((p) => !existingIds.has(p.id))
                    return [...prevData, ...filteredNewData]
                })

                setPage((prevPage) => prevPage + 1)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (inView) {
            loadMore()
        }
    }, [inView, page, keyword, isLoading, isEnd])

    useEffect(() => {
        if (params) {
            const keywordFromParams = params.get('keyword') || ''
            if (keywordFromParams !== keyword) {
                // Mengupdate keyword jika berbeda dari yang ada di URL
                router.push(`/?keyword=${keywordFromParams}`)
            }
        }
    }, [params, router, keyword])

    return (
        <>
            {data.length > 0 ? (
                data.map((product, index) => {
                    const slugName = product.name
                        .toLowerCase()
                        .replace(/\s+/g, '')
                        .replace(/[^a-z0-9]/g, '')
                    const slug = `${slugName}-${product.id}-${index}`

                    return (
                        <ProductCard
                            key={`product-${product.id}-${index}`}
                            product={{ ...product, slug }}
                        />
                    )
                })
            ) : isLoading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                    <ProductCardSkeleton key={`skeleton-${idx}`} />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                    Tidak ada produk.
                </p>
            )}

            {isLoading && data.length > 0 && (
                <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                </>
            )}

            {isEnd && (
                <div className="col-span-full text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Semua produk sudah ditampilkan
                </div>
            )}

            {!isEnd && <div ref={ref} className="h-1 col-span-full" />}
        </>
    )
}
