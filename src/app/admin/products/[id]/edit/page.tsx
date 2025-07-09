
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById, getCategories } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';


const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  category: z.string({ required_error: "Please select a category."}).min(1, 'Category is required.'),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null | undefined>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema)
    });

     useEffect(() => {
        async function loadData() {
            const [fetchedProduct, fetchedCategories] = await Promise.all([
                getProductById(params.id),
                getCategories()
            ]);

            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setCategories(fetchedCategories);
                form.reset({
                    name: fetchedProduct.name,
                    description: fetchedProduct.description,
                    price: fetchedProduct.price,
                    category: fetchedProduct.category,
                });
            } else {
                setProduct(undefined);
            }
        }

        loadData();
    }, [params.id, form]);

    function onSubmit(data: ProductFormValues) {
        // In a real app, you would send this data to your API to update the product.
        console.log("Updated product data:", { id: params.id, ...data });
        toast({
            title: "Product Updated!",
            description: `${data.name} has been updated.`,
        });
        router.push('/admin/products');
    }

    if (product === null) {
        return (
             <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-48" /></CardTitle>
                    <CardDescription><Skeleton className="h-5 w-64" /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                   <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                   <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-20 w-full" /></div>
                   <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                   <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                   <div className="flex gap-2"><Skeleton className="h-10 w-32" /><Skeleton className="h-10 w-24" /></div>
                </CardContent>
            </Card>
        );
    }
    
    if (product === undefined) {
        return notFound();
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Product</CardTitle>
                <CardDescription>
                    Update the details for "{product.name}".
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Solar Water Heater" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the product in detail..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (KES)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 12000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a product category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The product category will help with filtering and search.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2">
                           <Button type="submit" disabled={form.formState.isSubmitting}>Save Changes</Button>
                           <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
