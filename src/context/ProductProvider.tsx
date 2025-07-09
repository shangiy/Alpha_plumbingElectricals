
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { getProducts as fetchProducts, seedProducts } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';


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

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (productData: ProductFormData) => Promise<void>;
  updateProduct: (productId: string, productData: ProductFormData) => Promise<void>;
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

  const loadProducts = useCallback(async () => {
    setLoading(true);
    await seedProducts(); // Seed data if db is empty
    const fetchedProducts = await fetchProducts();
    setProducts(fetchedProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = useCallback(async (productData: ProductFormData) => {
    const newProductDocument: Omit<Product, 'id'> = {
      ...productData,
      rating: Math.floor(Math.random() * 2) + 3.5, // 3.5 to 4.5
      reviews: Math.floor(Math.random() * 100),
      seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
      longDescription: productData.description,
      isFeatured: productData.isFeatured || false,
    };
    const docRef = await addDoc(collection(db, "products"), newProductDocument);
    setProducts(prevProducts => [{ id: docRef.id, ...newProductDocument }, ...prevProducts]);
  }, []);

  const updateProduct = useCallback(async (productId: string, productData: ProductFormData) => {
    const productRef = doc(db, "products", productId);
    
    // We need to fetch the existing product to keep non-form fields
    const existingProduct = products.find(p => p.id === productId);
    if (!existingProduct) {
        console.error("Product not found for update:", productId);
        return;
    }

    const updatedProductData: Product = {
        ...existingProduct,
        ...productData,
        longDescription: productData.description,
    };

    // We only update the fields that are part of the form, preserving rating etc.
    // Firestore's setDoc with merge:true would also work, but this is explicit.
    await setDoc(productRef, {
        name: updatedProductData.name,
        description: updatedProductData.description,
        longDescription: updatedProductData.longDescription,
        price: updatedProductData.price,
        images: updatedProductData.images,
        category: updatedProductData.category,
        seller: updatedProductData.seller,
        barcode: updatedProductData.barcode,
        colors: updatedProductData.colors,
        isFeatured: updatedProductData.isFeatured,
        rating: existingProduct.rating, // preserve original rating
        reviews: existingProduct.reviews, // preserve original reviews
    });

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId 
        ? updatedProductData
        : p
      )
    );
  }, [products]);

  const getProductById = useCallback((productId: string): Product | undefined => {
      return products.find(p => p.id === productId);
  }, [products]);

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    getProductById
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
