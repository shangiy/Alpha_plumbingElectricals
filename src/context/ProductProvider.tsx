
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { getProducts as fetchProducts } from '@/lib/data';

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    barcode?: string;
    images: string[];
    colors?: string[];
    isFeatured?: boolean;
}

const generateId = () => `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (productData: ProductFormData) => void;
  updateProduct: (productId: string, productData: ProductFormData) => void;
  getProductById: (productId: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const addProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      rating: 0,
      reviews: 0,
      seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
      longDescription: productData.description,
      isFeatured: productData.isFeatured || false,
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (productId: string, productData: ProductFormData) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { 
            ...p,
            ...productData,
            longDescription: productData.description,
        } : p
      )
    );
  };

  const getProductById = (productId: string): Product | undefined => {
      return products.find(p => p.id === productId);
  }

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    getProductById
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
