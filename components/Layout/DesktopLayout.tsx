// components/Layout/DesktopLayout.tsx
import Header from '../Header'
import Footer from '../Footer'
import { ReactNode } from 'react'

export default function DesktopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container max-w-screen-xl mx-auto px-4 py-6">{children}</main>
      <Footer />
    </>
  )
}
