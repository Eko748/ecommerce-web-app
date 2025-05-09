import ClientRenderer from '@/components/Home/ClientRenderer'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

// Ensure Props type includes searchParams and possibly extend from PageProps if necessary
type Props = {
  searchParams?: {
    keyword?: string
  }
}

export default function HomePageWrapper({ searchParams }: Props) {
  const keyword = searchParams?.keyword || ''
  return <ClientRenderer keyword={keyword} />
}
