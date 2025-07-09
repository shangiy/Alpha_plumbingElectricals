
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
import { Wand2, Trash2, PlusCircle, LoaderCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import { generateProductDescription } from '@/ai/flows/product-description-generator';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useProducts } from '@/context/ProductProvider';
import { Switch } from '@/components/ui/switch';

const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  category: z.string({ required_error: "Please select a category."}).min(1, 'Category is required.'),
  barcode: z.string().optional(),
  images: z.array(z.string().min(1, { message: "Image URL or data cannot be empty." })).min(1, "At least one image is required.").max(7, "You can upload a maximum of 7 images."),
  colors: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const availableColors = ["Black", "White", "Silver", "Red", "Blue", "Green"];

export default function AddProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { addProduct } = useProducts();

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
            images: [""],
            colors: [],
            isFeatured: false,
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
            const images = form.getValues("images");
            let firstImage: string | undefined = images && images.length > 0 ? images[0] : undefined;
            
            // Ensure we only send a data URI to the AI flow
            if (firstImage && !firstImage.startsWith('data:image')) {
                firstImage = undefined;
            }

            const result = await generateProductDescription({ 
                productTitle: productName,
                productImageDataUri: firstImage
            });

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

    const handleFiles = (files: FileList) => {
        const filesToProcess = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (filesToProcess.length === 0) return;

        const currentImages = form.getValues('images').filter(img => img && img.trim() !== '');

        if (currentImages.length + filesToProcess.length > 7) {
            toast({ variant: "destructive", title: "Too Many Images", description: "You can upload a maximum of 7 images.", });
            return;
        }

        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                const latestImages = form.getValues('images');
                const emptyIndex = latestImages.findIndex(img => img === '');
                if (emptyIndex !== -1) {
                    form.setValue(`images.${emptyIndex}`, dataUrl, { shouldValidate: true });
                } else if (latestImages.length < 7) {
                    append(dataUrl);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };
    
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (e.clipboardData.files) {
            e.preventDefault();
            handleFiles(e.clipboardData.files);
        }
    };

    function onSubmit(data: ProductFormValues) {
        addProduct(data);
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
                         <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Feature on homepage</FormLabel>
                                        <FormDescription>
                                            If enabled, this product will appear in the "Featured Products" section.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Colors</FormLabel>
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
                                {availableColors.map((color) => (
                                    <FormField
                                        key={color}
                                        control={form.control}
                                        name="colors"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(color)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...(field.value || []), color])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== color
                                                                    )
                                                                );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm">{color}</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                             <FormDescription>Optional: Select the available colors for the product.</FormDescription>
                             <FormMessage />
                        </FormItem>
                         <FormItem>
                            <FormLabel>Product Images</FormLabel>
                            <Card 
                                onDrop={handleDrop} 
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                                onDragEnter={() => setIsDragging(true)}
                                onDragLeave={() => setIsDragging(false)}
                                onPaste={handlePaste}
                            >
                                <CardContent className={cn("p-4 relative", isDragging && "border-2 border-dashed border-primary bg-primary/10")}>
                                    {isDragging && (
                                        <div className="absolute inset-0 flex items-center justify-center text-primary font-semibold z-10">
                                            <Upload className="mr-2 h-5 w-5" /> Drop image(s) here
                                        </div>
                                    )}
                                    <div className={cn("space-y-4", isDragging && "opacity-50")}>
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
                                                                <Input placeholder="https://example.com/image.png or drop/paste an image" {...field} />
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
                                    {fields.length < 7 && (
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
                                    )}
                                </CardContent>
                            </Card>
                            <FormDescription>
                               Add URLs for your product images, or drag and drop/paste an image file into the box. The first image will be the main one. Max 7 images.
                            </FormDescription>
                            <FormMessage className="text-destructive">{form.formState.errors.images?.root?.message || form.formState.errors.images?.message}</FormMessage>
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
