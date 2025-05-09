'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar'
import Link from 'next/link'

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const savedMode = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedMode === 'dark' || prefersDark) {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        setIsMounted(true)
    }, [])

    const toggleTheme = () => {
        const nextMode = !isDarkMode
        setIsDarkMode(nextMode)

        if (nextMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-300 bg-blue-500 via-blue-700 to-blue-900 text-white py-3 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-y-4 dark:bg-gray-800 dark:text-gray-300">
            <Link
                href="/"
                className="flex items-center gap-2 text-white font-bold text-xl flex-shrink-0"
            >
                <span className="bg-white text-blue-600 rounded px-2 py-1">S</span>
                <span>Shopee Clone</span>
            </Link>

            <div className="w-full order-3 sm:order-2 sm:flex-1 sm:max-w-2xl sm:mx-6 flex items-center">
                <SearchBar />
                <a href="#" className="ml-4 items-center justify-center relative group inline-block">
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-xl cursor-pointer transition-transform duration-200 ease-in-out group-hover:scale-150 active:scale-50"
                    />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                        3
                    </span>
                </a>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm order-2 sm:order-3 w-full sm:w-auto justify-end sm:justify-normal relative">
                <a href="#" className="relative group inline-block ml-3">
                    <FontAwesomeIcon
                        icon={faBell}
                        className="text-xl cursor-pointer transition-transform duration-200 ease-in-out group-hover:scale-150 active:scale-50"
                    />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                        5
                    </span>
                </a>
                <button
                    className="relative group inline-block cursor-pointer"
                    onClick={toggleTheme}
                >
                    {isMounted && (
                        <FontAwesomeIcon
                            icon={isDarkMode ? faSun : faMoon}
                            className="text-xl cursor-pointer transition-transform duration-200 ease-in-out group-hover:scale-150 active:scale-50"
                            style={{
                                transform: isDarkMode    ? 'rotate(0deg)' : 'rotate(200deg)'
                            }}
                        />
                    )}
                </button>

                <span className="hidden lg:inline">Bahasa Indonesia</span>
                <span className="font-semibold">excelex</span>
            </div>
        </header>
    )
}
