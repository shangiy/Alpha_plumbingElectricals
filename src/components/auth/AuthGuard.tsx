'use client';
import { useAuth } from '@/context/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle } from 'lucide-react';

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/auth/login?redirect=${pathname}`);
        }
    }, [user, loading, router, pathname]);

    if (loading || !user) {
        return (
             <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
                 <div className="flex items-center gap-2 text-lg text-muted-foreground">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <p>Loading your page...</p>
                 </div>
             </div>
        );
    }
    
    return <>{children}</>;
}
