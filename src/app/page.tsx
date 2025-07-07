import { getFeaturedProducts } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import DeliveryServices from '@/components/common/DeliveryServices';
import ConnectWithUs from '@/components/common/ConnectWithUs';
import HomepageAbout from '@/components/common/HomepageAbout';
import Hero from '@/components/common/Hero';
import CategoryCarousel from '@/components/common/CategoryCarousel';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <div>
      <Hero />
      <CategoryCarousel />
      <div className="container mx-auto px-4 py-16">
        <section>
          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Featured Products</h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-headline font-semibold">No Products Found</h3>
              <p className="mt-2 text-muted-foreground">Please check back later.</p>
            </div>
          )}
        </section>
      </div>
      
      <DeliveryServices />
      <ConnectWithUs />
      <HomepageAbout />

    </div>
  );
}
