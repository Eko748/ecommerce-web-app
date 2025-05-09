'use client'

import { useState } from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import { Product } from '@/types/product'
import ProductList from '@/components/Product/ProductList'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import MobileLayout from '@/components/Layout/MobileLayout'

type Props = {
  keyword?: string
  initialData: Product[]
}

export default function ClientRenderer({ initialData, keyword = '' }: Props) {
  const isMobile = useIsMobile()
  const [error] = useState<string | null>(null)

  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 py-6">
      {error ? (
        <div className="col-span-full text-center text-red-500">{error}</div>
      ) : (
        <ProductList initial={initialData} keyword={keyword} />
      )}
    </div>
  )

  return isMobile ? (
    <MobileLayout>{content}</MobileLayout>
  ) : (
    <DesktopLayout>{content}</DesktopLayout>
  )
}
