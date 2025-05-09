export default function Footer() {
    return (
        <footer className="mt-auto bg-theme-100 text-theme-700 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <h4 className="font-semibold mb-2 text-base">Shopee Clone</h4>
                    <p className="text-sm leading-relaxed">
                        Platform belanja online dengan penawaran terbaik dan produk pilihan.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-base">Kategori</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-blue-500">Elektronik</a></li>
                        <li><a href="#" className="hover:text-blue-500">Fashion</a></li>
                        <li><a href="#" className="hover:text-blue-500">Kecantikan</a></li>
                        <li><a href="#" className="hover:text-blue-500">Rumah Tangga</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-base">Bantuan</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-blue-500">Pusat Bantuan</a></li>
                        <li><a href="#" className="hover:text-blue-500">Cara Belanja</a></li>
                        <li><a href="#" className="hover:text-blue-500">Pengembalian</a></li>
                        <li><a href="#" className="hover:text-blue-500">Hubungi Kami</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-base">Ikuti Kami</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
                        <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
                        <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="bg-theme-200 text-center py-4 text-xs text-theme-700 px-4">
                &copy; {new Date().getFullYear()} Shopee Clone. Semua hak dilindungi.
            </div>
        </footer>
    )
}
