import { fetchProducts } from '@/lib/api'
import ClientRenderer from '@/components/Home/ClientRenderer'

// Define the Props type properly
type Props = {
  searchParams?: Promise<{ keyword?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  // Resolve the promise to get searchParams
  const resolvedSearchParams = await searchParams
  const keyword = resolvedSearchParams?.keyword || ''
  
  const response = await fetchProducts({ page: 1, limit: 10, keyword })
  const initial = response?.data || []

  return (
    <>
      <ClientRenderer initial={initial} keyword={keyword} />
    </>
  )
}
