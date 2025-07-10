
import { getLightingProducts } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';

export default async function LightingPage() {
  const lightingProducts = await getLightingProducts();

  return (
    <section className="bg-secondary py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center text-primary">Lighting & Electrical Collection</h2>
        {lightingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {lightingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-headline font-semibold">No Products Found</h3>
            <p className="mt-2 text-muted-foreground">Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}
