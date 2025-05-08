// components/ClientProductList.tsx
'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { fetchProducts } from '@/lib/api'
import { useInView } from 'react-intersection-observer'
import ProductCard from './ProductCard'

type ListProps = {
    initial: Product[]
}

const OFFSET = 10

export default function ClientProductList({ initial }: ListProps) {
    const [page, setPage] = useState(2)
    const [data, setData] = useState<Product[]>(initial)
    const { ref, inView } = useInView()

    useEffect(() => {
        let isFetching = false

        const loadMore = async () => {
            if (isFetching) return
            isFetching = true
            try {
                const response = await fetchProducts({ page, limit: OFFSET })
                const newData = response.data || []

                if (newData.length === 0) return

                setData((prevData) => {
                    const existingIds = new Set(prevData.map((p) => p.id))
                    const filteredNewData = newData.filter((p) => !existingIds.has(p.id))
                    return [...prevData, ...filteredNewData]
                })

                setPage((prevPage) => prevPage + 1)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                isFetching = false
            }
        }

        if (inView) {
            loadMore()
        }
    }, [inView, page])

    return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
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
            ) : (
                <p>No products available.</p>
            )}

            <div key="loading-indicator" ref={ref}>
                Loading...
            </div>
        </main>
    )
}
