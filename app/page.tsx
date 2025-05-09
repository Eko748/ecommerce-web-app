import { Metadata } from 'next'
import ClientRenderer from '@/components/Home/ClientRenderer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

type PageProps = {
  params: Record<string, never>
  searchParams?: {
    keyword?: string
  }
}


export default function HomePageWrapper({ searchParams }: PageProps) {
  const keyword = searchParams?.keyword || ''
  return <ClientRenderer keyword={keyword} />
}
