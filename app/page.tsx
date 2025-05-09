// app/page.tsx
import ClientRenderer from '@/components/Home/ClientRenderer'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HomePageWrapper({ searchParams }: PageProps) {
  const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword : ''
  return <ClientRenderer keyword={keyword} />
}
