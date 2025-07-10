
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { seedProducts } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, onSnapshot, getDocs } from 'firebase/firestore';


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
  submitting: boolean;
  addProduct: (productData: ProductFormData) => Promise<void>;
  updateProduct: (productId: string, productData: Partial<ProductFormData>) => Promise<void>;
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    
    const productsCollection = collection(db, "products");
    
    const unsubscribe = onSnapshot(productsCollection, 
        (snapshot) => {
            const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
            setProducts(productList);
            if(loading) setLoading(false);
        }, 
        (error) => {
            console.error("Error fetching products from Firestore: ", error);
            setLoading(false);
        }
    );

    // Initial check for seeding
    const checkAndSeed = async () => {
        try {
            const snapshot = await getDocs(productsCollection);
            if (snapshot.empty) {
                console.log('No products found in Firestore. Seeding initial data...');
                await seedProducts();
                 // The onSnapshot listener will pick up the changes, no need to set state here.
            } else {
                 // Data already exists, onSnapshot has already set it.
                 // We can turn off loading here if not already off.
                 setLoading(false);
            }
        } catch (error) {
            console.error("Error checking or seeding products:", error);
            setLoading(false);
        }
    };
    
    checkAndSeed();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading]);

  const addProduct = useCallback(async (productData: ProductFormData) => {
    setSubmitting(true);
    try {
        const newProductDocument: Omit<Product, 'id'> = {
            ...productData,
            rating: Math.floor(Math.random() * 2) + 3.5, // 3.5 to 4.5
            reviews: Math.floor(Math.random() * 100),
            seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
            longDescription: productData.description,
            isFeatured: productData.isFeatured || false,
        };
        await addDoc(collection(db, "products"), newProductDocument);
        // Real-time listener will update the state, no need to manually setProducts
    } catch (error) {
        console.error("Error adding product:", error);
        throw error; // Re-throw to be caught in the form
    } finally {
        setSubmitting(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId: string, productData: Partial<ProductFormData>) => {
    setSubmitting(true);
    try {
        const productRef = doc(db, "products", productId);
        
        const updateData: Partial<Product> = { ...productData };
        if (productData.description) {
            updateData.longDescription = productData.description;
        }

        await updateDoc(productRef, updateData);
        // Real-time listener will update the state
    } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Re-throw to be caught in the form
    } finally {
        setSubmitting(false);
    }
  }, []);

  const getProductById = useCallback((productId: string): Product | undefined => {
      return products.find(p => p.id === productId);
  }, [products]);

  const value = {
    products,
    loading,
    submitting,
    addProduct,
    updateProduct,
    getProductById
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
