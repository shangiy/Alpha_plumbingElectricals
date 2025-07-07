'use client';
    
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';
import { cn } from '@/lib/utils';

interface HeroSearchProps {
  variant?: 'hero' | 'docked';
}

export default function HeroSearch({ variant = 'hero' }: HeroSearchProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const placeholders = [
        "Search for 'water tanks'...",
        "Search for 'LED lights'...",
        "Search for 'PPR pipes'...",
        "Search for 'solar heaters'...",
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/search');
        }
    };

    const isHero = variant === 'hero';

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(isHero && "w-full max-w-xl mx-auto")}
        >
            <div className="relative">
                <label htmlFor={isHero ? "hero-search" : "docked-search"} className="sr-only">Search</label>
                <Search className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10",
                    isHero ? "left-5 h-5 w-5 text-gray-300" : "left-3 h-4 w-4 text-muted-foreground"
                )} />
                <Input
                    id={isHero ? "hero-search" : "docked-search"}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        "w-full",
                        isHero 
                            ? "h-16 pl-14 pr-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300 focus:bg-white/20 focus:ring-2 focus:ring-white/50 border border-white/20"
                            : "h-10 pl-9"
                    )}
                    placeholder={
                        isHero 
                            ? (isFocused ? "What are you looking for?" : "")
                            : "Search products..."
                    }
                />
                {isHero && !isFocused && query === '' && (
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 h-6 pointer-events-none">
                        <AnimatedPlaceholder placeholders={placeholders} className="text-gray-300" />
                    </div>
                )}
            </div>
        </form>
    );
}
