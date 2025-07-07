'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Search, User, Menu, ChevronDown, X } from 'lucide-react';
import ShoppingCart from './ShoppingCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const productCategories = [
    { name: 'Tanks Collection', href: '#', icon: '/kentank 2000l.png' },
    { name: 'Plumbing Equipment', href: '#', icon: '/ppr pipes.png' },
    { name: 'Lighting & Electrical', href: '#', icon: '/decor lighting design.png' },
    { name: 'Home & Décor', href: '#', icon: '/square lights.png' },
    { name: 'Roofing & Construction', href: '#', icon: '/roof 2.png' },
];

const ProductsDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
                    Products
                    <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                 {productCategories.map((category) => (
                     <DropdownMenuItem key={category.name} asChild>
                         <Link href={category.href} className="flex items-center gap-3 py-2">
                            <Image src={category.icon} alt={category.name} width={24} height={24} />
                            <span>{category.name}</span>
                         </Link>
                     </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        
        {/* Left Group: Logo & Name */}
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={80} height={80} />
              <span className="hidden text-xl font-bold font-headline text-primary md:block">Alpha Electricals</span>
            </Link>
        </div>

        {/* Center Group: Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
            <ProductsDropdown />
            {navLinks.map((link) => (
               <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
        </nav>

        {/* Right Group: Search, Icons */}
        <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div ref={searchContainerRef} className="hidden md:flex relative items-center">
                <form>
                  <Input
                    type="search"
                    placeholder="Search..."
                    className={cn(
                      'h-10 rounded-full pl-5 pr-10 transition-all duration-300 ease-in-out',
                      isSearchExpanded ? 'w-48' : 'w-0 p-0 border-transparent'
                    )}
                  />
                </form>
                 <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
            </div>

            <ShoppingCart />
            
            <div className="hidden md:flex">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <User className="h-5 w-5 mr-2" />
                            <span>{user ? user.username : 'Sign In'}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {user ? (
                            <>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/seller/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="#">My Orders</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/wishlist">My Wishlist</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setUser(null)}>Log out</DropdownMenuItem>
                            </>
                        ) : (
                           <>
                            <DropdownMenuItem onClick={() => setUser({ username: 'JaneDoe' })}>
                                Sign In
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem asChild>
                                <Link href="/seller/profile">Create Account</Link>
                            </DropdownMenuItem>
                           </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex h-full flex-col p-4">
                    <Link href="/" className="mb-4 flex items-center gap-2">
                       <Image src="/logo Alpha.png" alt="Logo" width={60} height={60} />
                       <span className="text-lg font-bold font-headline text-primary">Alpha Electricals</span>
                    </Link>
                    <DropdownMenuSeparator />
                     <div className="relative my-4">
                        <Input
                          type="search"
                          placeholder="Search..."
                          className="w-full rounded-full pl-10"
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute left-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full">
                          <Search className="h-4 w-4" />
                          <span className="sr-only">Search</span>
                        </Button>
                      </div>
                    <nav className="flex flex-col gap-2">
                      <h3 className="px-2 text-sm font-semibold text-muted-foreground">Products</h3>
                      {productCategories.map((category) => (
                        <SheetClose asChild key={category.name}>
                          <Link
                            href={category.href}
                            className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            <Image src={category.icon} alt={category.name} width={24} height={24} />
                            <span>{category.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                      <DropdownMenuSeparator />
                       <h3 className="px-2 text-sm font-semibold text-muted-foreground">Menu</h3>
                      {navLinks.map((link) => (
                         <SheetClose asChild key={link.name}>
                            <Link
                              href={link.href}
                              className="px-2 py-2 text-base font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
                            >
                              {link.name}
                            </Link>
                         </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                        {user ? (
                           <>
                             <SheetClose asChild><Link href="/seller/profile" className="px-3 py-2 text-base font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground flex items-center gap-2"><User className="h-5 w-5"/>My Account</Link></SheetClose>
                             <SheetClose asChild><Link href="/wishlist" className="px-3 py-2 text-base font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground">My Wishlist</Link></SheetClose>
                            <Button variant="outline" onClick={() => setUser(null)}>Log Out</Button>
                           </>
                        ) : (
                          <div className="space-y-2">
                             <Button className="w-full" onClick={() => setUser({ username: 'JaneDoe' })}>Sign In</Button>
                             <Button variant="outline" className="w-full" asChild><Link href="/seller/profile">Create Account</Link></Button>
                          </div>
                        )}
                    </div>
                  </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
