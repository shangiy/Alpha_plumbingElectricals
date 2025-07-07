import { getFeaturedProducts, getHomePageCategories } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getHomePageCategories();
  
  // Duplicate categories for seamless looping animation
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Browse by Category Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">Browse by Category</h2>
        <div
          className="group relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
            {duplicatedCategories.map((category, index) => (
              <Link href="#" key={`${category.id}-${index}`} className="block w-48 shrink-0 mx-3">
                <Card className="overflow-hidden transition-shadow hover:shadow-xl">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      data-ai-hint="product category"
                    />
                  </div>
                  <CardContent className="p-3 text-center">
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">Featured Products</h2>
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
  );
}
