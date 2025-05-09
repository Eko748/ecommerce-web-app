// components/Home/ClientRenderer.tsx (client-side component)
'use client'

import { useEffect, useState } from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import { Product } from '@/types/product'
import { fetchProducts } from '@/lib/api'
import ProductList from '@/components/Product/ProductList'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import MobileLayout from '@/components/Layout/MobileLayout'
import { useSearchParams } from 'next/navigation'  // use this in the client component

type Props = {
  keyword?: string
}

export default function ClientRenderer({ keyword = '' }: Props) {
  const isMobile = useIsMobile()
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const params = useSearchParams() // Use it in client-side component
  const queryKeyword = params?.get('keyword') || keyword

  useEffect(() => {
    if (!queryKeyword.trim()) {
      setData([])
      return
    }

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchProducts({ page: 1, limit: 10, keyword: queryKeyword })
        if (res.data) {
          setData(res.data)
        } else {
          setData([])
        }
      } catch {
        setError('Failed to fetch products') 
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [queryKeyword])

  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 py-6">
      {loading ? (
        <div className="col-span-full text-center">Loading...</div>
      ) : error ? (
        <div className="col-span-full text-center text-red-500">{error}</div>
      ) : (
        <ProductList initial={data} keyword={queryKeyword} />
      )}
    </div>
  )

  return isMobile ? (
    <MobileLayout>{content}</MobileLayout>
  ) : (
    <DesktopLayout>{content}</DesktopLayout>
  )
}
