export default function ProductCardSkeleton() {
    return (
        <div className="border border-gray-200 dark:border-gray-700 shadow overflow-hidden animate-pulse rounded-md">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
            <div className="p-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
            </div>
        </div>
    );
}
