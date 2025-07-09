
'use client';

import { useProducts } from '@/context/ProductProvider';
import ProductCard from '@/components/products/ProductCard';
import DeliveryServices from '@/components/common/DeliveryServices';
import HomepageAbout from '@/components/common/HomepageAbout';
import Hero from '@/components/common/Hero';
import CategoryCarousel from '@/components/common/CategoryCarousel';
import ConnectWithUs from '@/components/common/ConnectWithUs';
import ImpactSection from '@/components/common/ImpactSection';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { products, loading } = useProducts();
  
  const featuredProducts = products.filter(p => p.isFeatured);

  const ProductListSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Hero />
      <CategoryCarousel />
      <div className="container mx-auto px-4 py-16">
        <section>
          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Featured Products</h2>
          {loading ? (
            <ProductListSkeleton />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-headline font-semibold">No Featured Products Found</h3>
              <p className="mt-2 text-muted-foreground">Admin can mark products as featured to show them here.</p>
            </div>
          )}
        </section>
      </div>
      
      <DeliveryServices />
      <ConnectWithUs />
      <HomepageAbout />
      <ImpactSection />

    </div>
  );
}
