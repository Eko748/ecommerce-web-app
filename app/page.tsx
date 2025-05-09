import type { NextPage } from 'next'
import { Metadata } from 'next'
import ClientRenderer from '@/components/Home/ClientRenderer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beranda | Shopee Clone',
    description: 'Temukan produk menarik dengan diskon hingga 80%',
  }
}

const HomePage: NextPage<{ searchParams?: { keyword?: string } }> = ({ searchParams }) => {
  const keyword = searchParams?.keyword || ''
  return <ClientRenderer keyword={keyword} />
}

export default HomePage

