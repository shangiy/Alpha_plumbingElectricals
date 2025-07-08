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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/context/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
});

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const redirectUrl = searchParams.get('redirect') || '/';

    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const signUpForm = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    function onLogin(data: LoginFormValues) {
        // In a real app, you would verify credentials with a backend
        console.log('Login attempt:', data);
        login({ name: 'Signed In User', email: data.email });
        toast({ title: "Login Successful!", description: "Welcome back!" });
        router.push(redirectUrl);
    }

    function onSignUp(data: SignUpFormValues) {
        // In a real app, you would register the user with a backend
        console.log('Sign Up attempt:', data);
        login({ name: data.name, email: data.email });
        toast({ title: "Account Created!", description: "Welcome! You are now logged in." });
        router.push(redirectUrl);
    }

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                                <FormField
                                    control={loginForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={loginForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Sign In</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                 <Card>
                    <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>
                           Enter your details below to create your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-6">
                                 <FormField
                                    control={signUpForm.control}
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
                                    control={signUpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Create Account</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
