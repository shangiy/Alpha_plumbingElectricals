
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductProvider';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import ProductRecommendations from '@/components/products/ProductRecommendations';
import BuyNowButton from '@/components/products/ContactSellerForm';
import { ShieldCheck, Tags } from 'lucide-react';
import AddToCartButton from '@/components/products/AddToCartButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import QuantitySelector from '@/components/products/QuantitySelector';

function ProductContent({ productId }: { productId: string }) {
  const { getProductById, loading } = useProducts();
  const router = useRouter();
  
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    if (!loading) {
        return (
             <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
                <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
            </div>
        );
    }
    return null;
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      currencyDisplay: 'code',
    }).format(price);
  };

  const isMeasurable = product.unit && product.unit !== 'item' && product.unit !== 'roll' && product.unit !== 'pack' && product.unit !== 'bundle' && product.unit !== 'sheet' && product.unit !== 'sq. meter';

  const priceDisplay = product.unit && product.unit !== 'item' 
    ? `${formatPrice(product.price)} / ${product.unit}`
    : formatPrice(product.price);
    
  const wholesaleInfo = product.wholesale 
    ? `Also available as a ${product.wholesale.quantity}${product.wholesale.unit} for ${formatPrice(product.wholesale.price)}.` 
    : '';

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
             <div className="aspect-square overflow-hidden rounded-lg border bg-card shadow-sm">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                    data-ai-hint={`${product.category} product`}
                />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img, index) => (
                     <div key={index} className="aspect-square overflow-hidden rounded-lg border bg-card">
                        <Image
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                            data-ai-hint={`${product.category} product`}
                        />
                     </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline lg:text-4xl">{product.name}</h1>
            {product.barcode && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tags className="h-4 w-4" />
                    <span>COD. {product.barcode}</span>
                </div>
            )}
            <div className="flex items-center gap-4">
              <Rating rating={product.rating} size={20} />
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>
            <p className="text-3xl font-bold font-headline text-primary">{priceDisplay}</p>
            <p className="text-base text-muted-foreground">{product.longDescription}</p>
            {wholesaleInfo && (
              <p className="text-sm text-muted-foreground italic">{wholesaleInfo}</p>
            )}

            {isMeasurable && (
              <QuantitySelector unit={product.unit!} onQuantityChange={setQuantity} />
            )}
            
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="h-8 w-8 text-primary"/>
                        <div>
                            <p className="font-semibold">Sold by {product.seller.name}</p>
                            <p className="text-sm text-muted-foreground">Verified Seller</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton product={product} quantity={quantity}/>
                <BuyNowButton product={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background py-16">
          <div className="container mx-auto px-4">
             <ProductRecommendations productTitle={product.name} productId={product.id} category={product.category} />
          </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  if (!productId) {
    return notFound();
  }
  
  return <ProductContent productId={productId} />;
}

function ProductDetailSkeleton() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="mt-4 grid grid-cols-4 gap-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-full" />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
