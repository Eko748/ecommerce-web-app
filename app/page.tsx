// app/page.tsx
import ClientRenderer from '@/components/Home/ClientRenderer'
import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

export default function HomePageWrapper({ searchParams }: any) {
  const keyword = searchParams?.keyword || ''
  return <ClientRenderer keyword={keyword} />
}
