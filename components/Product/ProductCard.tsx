import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-transform hover:scale-[1.02] overflow-hidden rounded-md">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                    <Image
                        src="/placeholder.jpg"
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl"
                    />
                </div>
                <div className="p-2">
                    <h5 className="text-sm font-semibold rev-text-theme-600 line-clamp-1">
                        {product.name}
                    </h5>
                    <p className="text-base font-bold mt-1 text-blue-500">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs rev-text-theme-300 mt-1">
                        Stok tersedia: {product.stock}
                    </p>
                    {product.description && (
                        <p className="text-xs rev-text-theme-300 mt-1 line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
