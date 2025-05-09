import { fetchProducts } from '@/lib/api'
import ClientRenderer from '@/components/Home/ClientRenderer'

// Generate metadata for the pag

// Page component
export default async function HomePage({ searchParams }: { searchParams: { keyword?: string } }) {
  const keyword = searchParams?.keyword || ''
  const response = await fetchProducts({ page: 1, limit: 10, keyword })
  const initial = response?.data || []

  return (
    <>
      <ClientRenderer initialData={initial} keyword={keyword} />
    </>
  )
}
