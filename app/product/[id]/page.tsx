// app/product/[id]/page.tsx
import { fetchProductById } from "@/lib/api"

type ProductDetailProps = {
    params: {
        id: string
    }
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    const product = await fetchProductById(params.id)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-lg mt-4 font-semibold">Rp {product.price}</p>
        </div>
    )
}
