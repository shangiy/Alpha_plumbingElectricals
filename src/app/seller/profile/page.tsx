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
import AuthGuard from '@/components/auth/AuthGuard';

const profileFormSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters.'),
  businessEmail: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(10, 'Please enter a full address.'),
  businessInfo: z.string().max(300, 'Description can be up to 300 characters.').optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function SellerProfileContent() {
    const { toast } = useToast();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            businessName: "",
            businessEmail: "",
            phone: "",
            address: "",
            businessInfo: "",
        },
    });

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "Profile Updated!",
            description: "Your seller profile has been saved successfully.",
        });
        console.log(data);
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Seller Profile</CardTitle>
                    <CardDescription>
                        Complete your profile to start selling. This information will be used for verification.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Company LLC" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="contact@yourcompany.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This email will be used for customer inquiries.
                                        </FormDescription>
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
                                            <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
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
                                        <FormLabel>Business Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="123 Main St, Anytown, USA 12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="businessInfo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About Your Business</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe your business and the products you sell." {...field} />
                                        </FormControl>
                                         <FormDescription>
                                            Provide a brief description of your business.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save Profile</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function SellerProfilePage() {
    return (
        <AuthGuard>
            <SellerProfileContent />
        </AuthGuard>
    )
}
