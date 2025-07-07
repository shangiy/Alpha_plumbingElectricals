'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartProvider';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Rating } from '@/components/ui/rating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: 'Added to Wishlist!',
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0 relative">
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
        <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/70 hover:bg-card text-destructive"
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
        >
            <Heart className="h-4 w-4" />
        </Button>
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
        <Button size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
