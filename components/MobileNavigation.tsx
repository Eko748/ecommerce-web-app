// components/MobileNavigation.tsx
'use client'

import { Home, Search, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

export default function MobileNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow md:hidden">
            <ul className="flex justify-around py-2 text-sm text-gray-700">
                <li><Link href="/"><Home size={20} /></Link></li>
                <li><Link href="/search"><Search size={20} /></Link></li>
                <li><Link href="/cart"><ShoppingCart size={20} /></Link></li>
                <li><Link href="/profile"><User size={20} /></Link></li>
            </ul>
        </nav>
    )
}
