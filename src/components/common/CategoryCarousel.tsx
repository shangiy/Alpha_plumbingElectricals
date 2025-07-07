'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCarouselCategories } from '@/lib/data';
import type { CarouselCategory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';

export default function CategoryCarousel() {
  const [categories, setCategories] = React.useState<CarouselCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCarouselCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Browse by Category</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                    </div>
                  </CarouselItem>
                ))
              : categories.map((category) => (
                  <CarouselItem key={category.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <Link href={category.href} passHref>
                        <Card className="overflow-hidden transition-shadow hover:shadow-lg group">
                          <CardContent className="flex aspect-[4/5] flex-col items-center justify-center p-4 text-center">
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="product category"
                                />
                            </div>
                            <h3 className="text-base font-semibold text-foreground">{category.name}</h3>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
