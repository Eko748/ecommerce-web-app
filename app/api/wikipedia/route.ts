// /app/api/wikipedia/route.ts (Next.js App Router)
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
    query || ''
  )}`

  const res = await fetch(wikipediaUrl, {
    headers: {
      'User-Agent': 'Next.js App',
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}
