import { fetchProducts } from '@/lib/api'
import { Metadata } from 'next'
import ClientRenderer from '@/components/Home/ClientRenderer'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

// Server Component (data fetching happens here)
export default async function HomePage({ searchParams }: { searchParams?: { keyword?: string } }) {
  // Get keyword from searchParams
  const keyword = searchParams?.keyword || ''

  // Fetch data from the API
  const response = await fetchProducts({ page: 1, limit: 10, keyword })
  const initial = response?.data || []

  // Pass data to ClientRenderer (Client Component)
  return (
    <ClientRenderer initialData={initial} keyword={keyword} />
  )
}
