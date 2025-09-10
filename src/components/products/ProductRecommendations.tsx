
'use client';

import { useEffect, useState } from 'react';
import { getProductRecommendations, ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Package } from 'lucide-react';

interface ProductRecommendationsProps {
  productTitle: string;
}

export default function ProductRecommendations({ productTitle }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ProductRecommendationsOutput['products'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const result = await getProductRecommendations({ searchQuery: productTitle });
        setRecommendations(result.products);
      } catch (err) {
        setError('Failed to load recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [productTitle]);

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
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {loading ? renderSkeletons() : 
            recommendations?.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <CardHeader className="p-0">
                      <Link href="#" className="block">
                        <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
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
                    <CardContent className="p-4">
                      <Link href="#">
                        <p className="mb-2 font-semibold leading-tight hover:text-primary">{product.name}</p>
                      </Link>
                      <p className="text-lg font-bold">{formatPrice(product.price)}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
