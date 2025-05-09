// components/Home/SearchBar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { fetchWikipediaSuggestions } from '@/lib/api'

export default function SearchBar() {
    const [keyword, setKeyword] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!params) return

        const search = new URLSearchParams(params.toString())
        if (keyword) {
            search.set('keyword', keyword)
        } else {
            search.delete('keyword')
        }
        setShowSuggestions(false)
        router.push(`/?${search.toString()}`)
    }

    const handleSuggestionClick = (text: string) => {
        setKeyword(text)
        setShowSuggestions(false)

        if (!params) return

        const search = new URLSearchParams(params.toString())
        search.set('keyword', text)
        router.push(`/?${search.toString()}`)
    }

    useEffect(() => {
        if (!keyword.trim()) {
            setSuggestions([])
            return
        }

        const timeout = setTimeout(async () => {
            try {
                const results = await fetchWikipediaSuggestions(keyword)
                setSuggestions(results)
                setShowSuggestions(true)
            } catch (error) {
                console.error("Error fetching suggestions:", error)
                setSuggestions([])
            }
        }, 300)

        return () => clearTimeout(timeout)
    }, [keyword])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <form
                onSubmit={handleSubmit}
                className="flex border border-white rounded overflow-hidden w-full"
            >
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 px-4 py-2 text-white bg-transparent placeholder-white focus:outline-none"
                    placeholder="Cari produk..."
                    onFocus={() => keyword && setShowSuggestions(true)}
                />
                <button
                    type="submit"
                    className="bg-white text-blue-500 px-4 flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 bg-white text-black border border-gray-200 mt-1 w-full rounded shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
