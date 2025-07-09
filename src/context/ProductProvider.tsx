
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { getProducts as fetchProductsFromDb, seedProducts } from '@/lib/data';
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

  useEffect(() => {
    async function initializeProducts() {
      try {
        await seedProducts(); // Seed data if db is empty, does nothing if not.
        const fetchedProducts = await fetchProductsFromDb();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error initializing products:", error);
      } finally {
        setLoading(false);
      }
    }

    initializeProducts();
  }, []);

  const addProduct = useCallback(async (productData: ProductFormData) => {
    setLoading(true);
    try {
        const newProductDocument: Omit<Product, 'id'> = {
        ...productData,
        rating: Math.floor(Math.random() * 2) + 3.5, // 3.5 to 4.5
        reviews: Math.floor(Math.random() * 100),
        seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
        longDescription: productData.description,
        isFeatured: productData.isFeatured || false,
        };
        const docRef = await addDoc(collection(db, "products"), newProductDocument);
        
        const newProduct: Product = { id: docRef.id, ...newProductDocument };
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    } catch (error) {
        console.error("Error adding product:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId: string, productData: ProductFormData) => {
    setLoading(true);
    try {
        const productRef = doc(db, "products", productId);
        
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
        
        await setDoc(productRef, updatedProductData);

        setProducts(prevProducts =>
        prevProducts.map(p =>
            p.id === productId 
            ? updatedProductData
            : p
        )
        );
    } catch (error) {
        console.error("Error updating product:", error);
    } finally {
        setLoading(false);
    }
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
