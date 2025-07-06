'use client';

import { useState, useMemo } from 'react';
import type { Product, Category } from '@/lib/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface ProductListProps {
  products: Product[];
  categories: Category[];
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState('relevance');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortOption) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return filtered.sort((a, b) => b.rating - a.rating);
      default: // 'relevance'
        return filtered;
    }
  }, [products, searchTerm, category, priceRange, sortOption]);

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 5000), [products]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };
  
  return (
    <div className="flex gap-8">
      <aside className="hidden w-64 flex-col gap-6 lg:flex">
        <h3 className="text-lg font-headline font-semibold">Filters</h3>
        
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
           <label htmlFor="price" className="mb-2 block text-sm font-medium">Price Range</label>
           <div className="flex justify-between text-sm text-muted-foreground">
               <span>{formatPrice(priceRange[0])}</span>
               <span>{formatPrice(priceRange[1])}</span>
           </div>
          <Slider
            id="price"
            min={0}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="mt-2"
          />
        </div>

        <Button onClick={() => {
            setSearchTerm('');
            setCategory('all');
            setPriceRange([0, maxPrice]);
            setSortOption('relevance');
        }}>Clear Filters</Button>

      </aside>

      <div className="flex-1">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-grow">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium">Sort by</label>
                <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating-desc">Top Rated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-headline font-semibold">No Products Found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
