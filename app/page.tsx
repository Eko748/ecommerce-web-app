import { Metadata } from 'next'
import ClientRenderer from '@/components/Home/ClientRenderer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

export default function HomePageWrapper({
  searchParams,
}: {
  searchParams?: { keyword?: string }
}) {
  const keyword = searchParams?.keyword || ''
  return <ClientRenderer keyword={keyword} />
}
