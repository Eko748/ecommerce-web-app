import { fetchProducts } from '@/lib/api'
import type { Metadata } from 'next'
import ClientRenderer from '@/components/Home/ClientRenderer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

// Define the Props type properly
type Props = {
  searchParams?: {
    keyword?: string
  }
}

// Handle page with the correct type
export default async function HomePage({ searchParams }: Props) {
  const keyword = searchParams?.keyword || ''
  const response = await fetchProducts({ page: 1, limit: 10, keyword })
  const initial = response?.data || []

  return (
    <>
      <ClientRenderer initial={initial} keyword={keyword} />
    </>
  )
}
