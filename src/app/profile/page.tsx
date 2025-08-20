
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthProvider';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User as UserIcon } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  username: z.string().min(3, 'Username must be at least 3 characters.').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.'),
  email: z.string().email('Please enter a valid email address.'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function ProfileContent() {
    const { toast } = useToast();
    const { user, updateUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            avatarUrl: '',
        },
    });
    
    const avatarUrl = form.watch('avatarUrl');

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl || '',
            });
        }
    }, [user, form]);
    
    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const downloadURL = await uploadImage(file);
            form.setValue('avatarUrl', downloadURL, { shouldValidate: true });
            toast({
                title: 'Avatar Updated!',
                description: 'Your new profile picture is ready.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Upload Failed',
                description: 'Could not upload your avatar. Please try again.',
            });
        } finally {
            setIsUploading(false);
        }
    };


    function onSubmit(data: ProfileFormValues) {
        if (!user) return;
        updateUser({ id: user.id, ...data });
        toast({
            title: "Profile Updated!",
            description: "Your profile information has been saved successfully.",
        });
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                    <CardDescription>
                        View and update your personal information here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src={avatarUrl} alt={user?.name} />
                                                <AvatarFallback>
                                                    {isUploading ? <Loader2 className="animate-spin" /> : <UserIcon size={32} />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                                                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                Change Avatar
                                            </Button>
                                            <FormControl>
                                                <Input 
                                                    type="file" 
                                                    className="hidden" 
                                                    ref={fileInputRef} 
                                                    onChange={handleAvatarUpload}
                                                    accept="image/png, image/jpeg, image/gif"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your full name" {...field} />
                                        </FormControl>
                                        <FormDescription>This is your public display name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your_username" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the name that will be displayed in the header.
                                        </FormDescription>
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
                                            <Input type="email" placeholder="you@example.com" {...field} disabled />
                                        </FormControl>
                                        <FormDescription>
                                            This is your login email and cannot be changed here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <AuthGuard>
            <ProfileContent />
        </AuthGuard>
    )
}
