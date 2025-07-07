import { getProducts, getCategories } from '@/lib/data';
import ProductList from '@/components/products/ProductList';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function SearchPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div>
        <div className="mb-8">
            <Skeleton className="h-9 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="flex gap-8 items-start">
        <aside className="hidden w-64 flex-col gap-6 lg:flex sticky top-28">
            <h3 className="text-lg font-headline font-semibold">Filters</h3>
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </aside>
        <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Skeleton className="h-10 flex-grow" />
                <Skeleton className="h-10 w-full md:w-44" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-1/2" />
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
  );
}
