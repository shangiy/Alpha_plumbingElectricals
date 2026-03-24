'use client';
import { useAuth } from '@/context/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoaderCircle, ShieldAlert } from 'lucide-react';

export default function AuthGuard({ children, allowedRoles }: { children: ReactNode, allowedRoles?: ('admin' | 'staff' | 'user')[] }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Only attempt redirect after initial loading is complete
        // and if we haven't already started a redirect to avoid loops
        if (!loading && !user && !isRedirecting) {
            setIsRedirecting(true);
            const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
            router.push(redirectUrl);
        }
    }, [user, loading, router, pathname, isRedirecting]);

    // Show loading state while checking auth
    if (loading || (!user && !isRedirecting)) {
        return (
             <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
                 <div className="flex items-center gap-2 text-lg text-muted-foreground">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <p>Verifying access...</p>
                 </div>
             </div>
        );
    }

    // If we are redirecting, keep showing the loading state to prevent interaction
    if (isRedirecting && !user) {
        return (
            <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    // Role-based access control
    if (user && allowedRoles && user.role && !allowedRoles.includes(user.role)) {
         return (
             <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
                 <Card className="w-full max-w-md text-center">
                     <CardHeader>
                         <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
                            <ShieldAlert className="h-10 w-10 text-destructive" />
                         </div>
                         <CardTitle className="mt-4">Permission Denied</CardTitle>
                         <CardDescription>
                            You do not have the necessary permissions to access this page.
                         </CardDescription>
                     </CardHeader>
                     <CardContent>
                         <Button onClick={() => router.push('/')}>Go to Homepage</Button>
                     </CardContent>
                 </Card>
             </div>
        );
    }
    
    // If we have a user, render the children
    return <>{children}</>;
}
