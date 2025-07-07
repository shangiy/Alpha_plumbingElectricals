'use client';
    
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HeroSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="flex items-center w-full p-1 pr-2 space-x-1 bg-white border border-gray-200 rounded-full shadow-md">
                <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tanks, lights, plumbing..."
                    className="flex-1 px-4 text-base bg-transparent border-none appearance-none h-11 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button variant="ghost" size="icon" type="button" className="shrink-0 rounded-full">
                    <Camera className="w-5 h-5 text-gray-500" />
                    <span className="sr-only">Search by image</span>
                </Button>
                <Button type="submit" size="lg" className="h-11 rounded-full bg-[#F57900] hover:bg-[#F57900]/90 text-white">
                    <Search className="w-5 h-5 mr-0 md:mr-2" />
                    <span className="hidden md:inline">Search</span>
                </Button>
            </div>
        </form>
    );
}
