import { getProductById } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import ProductRecommendations from '@/components/products/ProductRecommendations';
import BuyNowButton from '@/components/products/ContactSellerForm';
import { ShieldCheck } from 'lucide-react';
import AddToCartButton from '@/components/products/AddToCartButton';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
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

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline lg:text-4xl">{product.name}</h1>
            <div className="flex items-center gap-4">
              <Rating rating={product.rating} size={20} />
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>
            <p className="text-3xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
            <p className="text-base text-muted-foreground">{product.longDescription}</p>
            
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
                <AddToCartButton product={product} />
                <BuyNowButton product={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background py-16">
          <div className="container mx-auto px-4">
             <ProductRecommendations productTitle={product.name} />
          </div>
      </div>
    </div>
  );
}
