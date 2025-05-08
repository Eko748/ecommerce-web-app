// app/page.tsx
import { fetchProducts } from '@/lib/api'
import ClientProductList from '@/components/ClientProductList'

export default async function HomePage() {
  const response = await fetchProducts({ page: 1, limit: 10 })
  const initial = response?.data || []

  return <ClientProductList initial={initial} />
}
