
'use client';

import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

const staticFeaturedProducts: Product[] = [
  { id: 'static-1', name: 'Ample Light', price: 2500, images: ['/Ample Light.png'], description: 'A beautiful and bright ample light with several modes.', longDescription: '', category: 'lighting', rating: 4.5, reviews: 10, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-2', name: 'Oval Toilet', price: 7500, images: ['/oval toilet.jpg'], description: 'A modern and efficient oval toilet.', longDescription: '', category: 'plumbing', rating: 4.8, reviews: 25, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-3', name: 'Whole complete sink and cabinet', price: 7000, images: ['/Whole complete sink and cabinet.jpg'], description: 'A complete sink and cabinet set.', longDescription: '', category: 'plumbing', rating: 4.7, reviews: 18, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-4', name: 'Solar Heater non-pressurelized', price: 12000, images: ['/solar heater.png'], description: 'An energy-efficient solar water heater.', longDescription: '', category: 'plumbing', rating: 4.9, reviews: 32, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-5', name: 'Artistic Lights', price: 3300, images: ['/exquisite chandelier.jpg'], description: 'Unique and stylish artistic lights.', longDescription: '', category: 'lighting', rating: 4.6, reviews: 15, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-6', name: 'Electric cable', price: 3000, images: ['/Electric cable per roll.jpg'], description: 'High-quality electric wiring cable.', longDescription: '', category: 'lighting', rating: 4.9, reviews: 50, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-7', name: 'WarmLight wall bracket', price: 1900, images: ['/WarmLight wall bracket.jpg'], description: 'An elegant warm light wall bracket.', longDescription: '', category: 'lighting', rating: 4.5, reviews: 22, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-8', name: 'PPR Pipe Fittings', price: 30, images: ['/ppr pipe fittings.png'], description: 'A set of durable PPR pipe fittings.', longDescription: '', category: 'plumbing', rating: 5, reviews: 110, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-9', name: 'PPR Pipes', price: 200, images: ['/ppr pipes.png'], description: 'High-quality PPR pipes for plumbing.', longDescription: '', category: 'plumbing', rating: 4.8, reviews: 85, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-10', name: 'Switches & Sockets', price: 250, images: ['/versatile switches & Sockets.png'], description: 'Versatile switches and sockets.', longDescription: '', category: 'lighting', rating: 4.7, reviews: 95, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-11', name: 'Kitchen Sink', price: 1000, images: ['/kitchen taps.png'], description: 'A modern and durable kitchen sink.', longDescription: '', category: 'plumbing', rating: 4.6, reviews: 65, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-12', name: 'Stylish mirror', price: 1500, images: ['/Stylish mirror.jpg'], description: 'A stylish mirror to enhance your decor.', longDescription: '', category: 'decor', rating: 4.5, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-13', name: 'Bathroom makeOver Sink', price: 7500, images: ['/Bathroom makeOver Sink.png'], description: 'Complete sink for a bathroom makeover.', longDescription: '', category: 'plumbing', rating: 4.8, reviews: 35, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-14', name: 'Wall lights', price: 2000, images: ['/Wall lights.jpg'], description: 'Modern and stylish wall lights.', longDescription: '', category: 'lighting', rating: 4.7, reviews: 55, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-15', name: 'Frencia dual inlet wall tap', price: 1800, images: ['/Frencia dual inlet wall tap.jpg'], description: 'A functional dual inlet wall tap.', longDescription: '', category: 'plumbing', rating: 4.8, reviews: 28, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-16', name: 'Double sink with tap', price: 11000, images: ['/Double sink with tap.jpg'], description: 'A practical double kitchen sink.', longDescription: '', category: 'plumbing', rating: 4.9, reviews: 42, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { id: 'static-17', name: 'MDF & Chipboard', price: 5400, images: ['/MDF & chipboard.png'], description: 'High-quality MDF and chipboard.', longDescription: '', category: 'decor', rating: 4.6, reviews: 20, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
];


export default function FeaturedProducts() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Featured Products</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
                Check out our hand-picked selection of top-quality products.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {staticFeaturedProducts.slice(0, 15).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
