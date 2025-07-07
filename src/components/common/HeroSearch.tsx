'use client';
    
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';

export default function HeroSearch() {
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

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto"
        >
            <div className="relative">
                <label htmlFor="hero-search" className="sr-only">Search</label>
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 z-10" />
                <Input
                    id="hero-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-16 pl-14 pr-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300 focus:bg-white/20 focus:ring-2 focus:ring-white/50 border border-white/20"
                    placeholder={isFocused ? "What are you looking for?" : ""}
                />
                {!isFocused && query === '' && (
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 h-6 pointer-events-none">
                        <AnimatedPlaceholder placeholders={placeholders} className="text-gray-300" />
                    </div>
                )}
            </div>
        </form>
    );
}
