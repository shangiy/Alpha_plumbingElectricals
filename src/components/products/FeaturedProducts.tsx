
'use client';

import { useProducts } from '@/context/ProductProvider';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedProducts() {
  const { products, loading } = useProducts();

  const featuredProducts = products.filter(p => p.isFeatured);

  if (loading) {
    return (
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-9 w-1/3 mx-auto mb-2" />
          <Skeleton className="h-5 w-1/2 mx-auto mb-10" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-1/4" />
                </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null; // Don't render the section if there are no featured products
  }

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Featured Products</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
                Check out our hand-picked selection of top-quality products.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
