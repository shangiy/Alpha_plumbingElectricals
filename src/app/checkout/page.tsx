'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartProvider';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const checkoutFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(10, 'Please enter a full address.'),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
    const { toast } = useToast();
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    function onSubmit(data: CheckoutFormValues) {
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. We will be in touch shortly.",
        });
        console.log('Checkout Data:', data);
        console.log('Cart Items:', cartItems);
        clearCart();
        router.push('/');
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
          style: 'currency',
          currency: 'KES',
        }).format(price);
    };

    const shippingCost = cartTotal > 0 ? 500 : 0;
    const totalCost = cartTotal + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-3xl font-bold font-headline mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">You can't proceed to checkout with an empty cart.</p>
                <Button onClick={() => router.push('/')}>Continue Shopping</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Shipping Details</CardTitle>
                        <CardDescription>
                            Please provide your shipping information.
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
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="+254 712 345 678" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shipping Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123 Alpha St, Nairobi" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size="lg" className="w-full">Place Order</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="bg-secondary">
                    <CardHeader>
                        <CardTitle className="text-2xl">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Image src={item.images[0]} alt={item.name} width={64} height={64} className="rounded-md object-cover"/>
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-6"/>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p>{formatPrice(cartTotal)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Shipping</p>
                                <p>{formatPrice(shippingCost)}</p>
                            </div>
                        </div>
                        <Separator className="my-6"/>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>{formatPrice(totalCost)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
