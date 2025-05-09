// components/Home/ClientRenderer.tsx
"use client"

import { useEffect, useState } from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import { Product } from '@/types/product'
import { fetchProducts } from '@/lib/api'
import ProductList from '@/components/Product/ProductList'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import MobileLayout from '@/components/Layout/MobileLayout'

type Props = {
    keyword?: string
}

export default function ClientRenderer({ keyword = '' }: Props) {
    const isMobile = useIsMobile()
    const [data, setData] = useState<Product[]>([])

    useEffect(() => {
        const load = async () => {
            const res = await fetchProducts({ page: 1, limit: 10, keyword })
            setData(res.data || [])
        }
        load()
    }, [keyword])

    const content = (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 py-6">
            <ProductList initial={data} keyword={keyword} />
        </div>
    )

    return isMobile ? (
        <MobileLayout>{content}</MobileLayout>
    ) : (
        <DesktopLayout>{content}</DesktopLayout>
    )
}
