import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const frequentSearches = [
    { name: 'Water Tanks', href: '/tanks' },
    { name: 'LED Lights', href: '#' },
    { name: 'PPR Pipes', href: '/plumbing' },
    { name: 'Solar Heaters', href: '#' },
  ];
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x800.png"
        alt="Workers in a modern office"
        fill
        className="object-cover -z-10"
        data-ai-hint="business office team"
        priority
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          Welcome to Alpha Electricals & Plumbing Ltd
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Your trusted source for Tanks, Lighting, Plumbing & More
        </p>
        <form className="w-full max-w-2xl mx-auto bg-white rounded-full p-2 flex items-center shadow-lg">
          <Input
            type="search"
            placeholder="Search for products..."
            className="flex-grow bg-transparent border-none focus-visible:ring-0 text-base text-gray-800 placeholder:text-gray-500"
          />
          <Button type="submit" size="lg" className="rounded-full bg-accent hover:bg-accent/90">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
        <div className="mt-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <span className="text-sm font-medium">Frequently searched:</span>
          {frequentSearches.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm rounded-full px-3 py-1 border border-white/50 bg-white/10 hover:bg-white/20 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
