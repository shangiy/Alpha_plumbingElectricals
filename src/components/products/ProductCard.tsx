import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              data-ai-hint={`${product.category} product`}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="mb-2 text-base font-semibold leading-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
        <p className="mb-2 text-sm text-muted-foreground">{product.description}</p>
        <Rating rating={product.rating} showReviewCount reviewCount={product.reviews} size={16}/>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
