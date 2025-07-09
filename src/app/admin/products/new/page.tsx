
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
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
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Category } from '@/lib/types';
import { getCategories } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Wand2, Trash2, PlusCircle, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { generateProductDescription } from '@/ai/flows/product-description-generator';

const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  category: z.string({ required_error: "Please select a category."}).min(1, 'Category is required.'),
  barcode: z.string().optional(),
  images: z.array(z.string().url({ message: "Please enter a valid image URL." })).min(1, "At least one image is required."),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AddProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }
        loadCategories();
    }, []);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            barcode: "",
            images: [""]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images"
    });

    const handleGenerateDescription = async () => {
        const productName = form.getValues("name");
        if (!productName) {
            toast({
                variant: "destructive",
                title: "Product Name is Missing",
                description: "Please enter a product name before generating a description.",
            });
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateProductDescription({ productTitle: productName });
            form.setValue("description", result.productDescription, { shouldValidate: true });
            toast({
                title: "Description Generated!",
                description: "The AI-powered description has been filled in.",
            });
        } catch (error) {
            console.error("Failed to generate description:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "Could not generate a description at this time.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    function onSubmit(data: ProductFormValues) {
        // In a real app, you would send this data to your API to create a new product.
        console.log(data);
        toast({
            title: "Product Created!",
            description: `${data.name} has been added to the store.`,
        });
        router.push('/admin/products');
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                    Fill out the form below to add a new product to your store.
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
                                     <div className="flex items-center justify-between gap-2">
                                        <FormLabel>Product Description</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating || !form.watch('name')}>
                                            {isGenerating ? (
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Wand2 className="mr-2 h-4 w-4" />
                                            )}
                                            Generate with AI
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Describe the product in detail..." {...field} rows={5} />
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
                            name="barcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Barcode / SKU</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 123456789012" {...field} />
                                    </FormControl>
                                    <FormDescription>The product's unique barcode or Stock Keeping Unit.</FormDescription>
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
                         <FormItem>
                            <FormLabel>Product Images</FormLabel>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex items-start gap-4">
                                                <div className="relative w-20 h-20 rounded-md overflow-hidden border flex-shrink-0 bg-muted">
                                                    <Image
                                                        src={form.watch(`images.${index}`) || 'https://placehold.co/80x80.png'}
                                                        alt={`Image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name={`images.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-grow">
                                                            <FormControl>
                                                                <Input placeholder="https://example.com/image.png" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                    className="text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() => append("")}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Image URL
                                    </Button>
                                </CardContent>
                            </Card>
                            <FormDescription>
                                Add URLs for your product images. The first image will be the main one.
                            </FormDescription>
                            <FormMessage className="text-destructive">{form.formState.errors.images?.message}</FormMessage>
                        </FormItem>
                        <div className="flex gap-2">
                           <Button type="submit">Save Product</Button>
                           <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
