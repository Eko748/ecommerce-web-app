import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";  // Import next/image

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="bg-white rounded-xl border shadow hover:shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                {/* Gambar Produk */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                    {/* Gunakan Image dari next/image */}
                    <Image
                        src="/placeholder.jpg" // Gambar default sementara
                        alt={product.name}
                        layout="fill"  // Membuat gambar mengikuti aspek rasio 1:1
                        objectFit="cover" // Menyesuaikan ukuran gambar
                        className="rounded-t-xl"
                    />
                </div>

                {/* Konten Produk */}
                <div className="p-4">
                    {/* Nama Produk */}
                    <h2 className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</h2>

                    {/* Harga Produk */}
                    <p className="text-sm text-primary font-bold mt-1">Rp {product.price.toLocaleString("id-ID")}</p>

                    {/* Stok Produk */}
                    <p className="text-xs text-gray-500 mt-1">Stok tersedia: {product.stock}</p>

                    {/* Deskripsi Produk */}
                    {product.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
