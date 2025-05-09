// components/Layout/MobileLayout.tsx
import { ReactNode } from 'react'
import MobileNavigation from '../MobileNavigation'
import Header from '../Header'

export default function MobileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <MobileNavigation />
        </div>
    )
}
