
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useProducts } from '@/context/ProductProvider';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Package } from 'lucide-react';

interface ProductRecommendationsProps {
  productTitle: string;
  productId?: string;
  category?: string;
}

export default function ProductRecommendations({ productTitle, productId, category }: ProductRecommendationsProps) {
  const { products, loading: productsLoading } = useProducts();
  const [error, setError] = useState<string | null>(null);

  const recommendations = useMemo(() => {
    if (!category || products.length === 0) {
      return [];
    }
    return products
      .filter(p => p.category === category && p.id !== productId)
      .slice(0, 8); // Limit to 8 recommendations
  }, [products, category, productId]);
  
  const loading = productsLoading;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      currencyDisplay: 'code',
    }).format(price);
  };

  const renderSkeletons = () => (
    [...Array(4)].map((_, i) => (
      <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
        <div className="p-1">
          <div className="space-y-3">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        </div>
      </CarouselItem>
    ))
  );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold font-headline">You Might Also Like</h2>
      {error && <p className="text-destructive">{error}</p>}
      <Carousel
        opts={{
          align: "start",
          loop: recommendations.length > 4, // Only loop if there are more items than fit on screen
        }}
        className="w-full"
      >
        <CarouselContent>
          {loading ? renderSkeletons() : 
            recommendations.length > 0 ? recommendations.map((product, index) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                    <CardHeader className="p-0">
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={400}
                              height={400}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              data-ai-hint="recommended product"
                            />
                          ) : (
                            <Package className="h-16 w-16 text-muted-foreground" />
                          )}
                        </div>
                      </Link>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <Link href={`/products/${product.id}`}>
                        <p className="mb-2 font-semibold leading-tight hover:text-primary">{product.name}</p>
                      </Link>
                      <p className="text-lg font-bold">{formatPrice(product.price)}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          : <p className="text-muted-foreground px-1">No other products in this category.</p>
          }
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
