'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, User, Menu, ChevronDown } from 'lucide-react';
import ShoppingCart from './ShoppingCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';

const productCategories = [
  { name: 'Tanks Collection', href: '/tanks', icon: '/kentank 2000l.png' },
  { name: 'Plumbing Equipment', href: '/plumbing', icon: '/ppr pipes.png' },
  {
    name: 'Lighting & Electrical',
    href: '#',
    icon: '/decor lighting design.png',
  },
  { name: 'Home & Décor', href: '/decor', icon: '/square lights.png' },
  { name: 'Roofing & Construction', href: '#', icon: '/roof 2.png' },
];

const frequentSearches = [
    'Water Tanks',
    'LED Lights',
    'PPR Pipes',
    'Solar Heaters',
];

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false);
  const [showSearchInHeader, setShowSearchInHeader] = useState(false);


  useEffect(() => {
    // On non-home pages, the header is always opaque with the search bar
    if (!isHomePage) {
      setIsHeaderOpaque(true);
      setShowSearchInHeader(true);
      return;
    }
    
    const handleScroll = () => {
      // Header becomes opaque after a small scroll
      setIsHeaderOpaque(window.scrollY > 50);
      // Search bar appears only after the hero's search bar is mostly out of view
      setShowSearchInHeader(window.scrollY > 400); 
    };

    handleScroll(); // Set initial state on mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);
  
  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
  ];
  
  const headerClasses = cn(
    "sticky top-0 z-50 w-full transition-colors duration-300",
    isHeaderOpaque 
      ? "bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60" 
      : isHomePage ? "bg-transparent" : "bg-background border-b"
  );

  const navAndIconClasses = cn(
    "transition-colors",
    !isHeaderOpaque && isHomePage ? "text-white" : "text-muted-foreground"
  );
  
  const navLinkHoverClasses = cn(
    !isHeaderOpaque && isHomePage ? "hover:text-white/80" : "hover:text-primary"
  );

  const iconButtonHoverClasses = cn(
    !isHeaderOpaque && isHomePage ? "hover:bg-white/20 hover:text-white" : "hover:bg-accent hover:text-accent-foreground"
  );

  const ProductsDropdown = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("px-4 py-2 text-sm font-semibold", navAndIconClasses, navLinkHoverClasses)}
          >
            Products
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {productCategories.map((category) => (
            <DropdownMenuItem key={category.name} asChild>
              <Link href={category.href} className="flex items-center gap-3 py-2">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={24}
                  height={24}
                />
                <span>{category.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-24 items-center justify-between gap-4 px-4">
        {/* Left: Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo Alpha.png"
              alt="Alpha Electricals & Plumbing Ltd Logo"
              width={90}
              height={90}
              className="h-auto"
            />
          </Link>
        </div>

        {/* Center: Nav or Search (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center items-center relative h-full">
            {/* Search Bar (appears on scroll or on non-home pages) */}
            <div className={cn(
              "absolute w-full max-w-lg transition-all duration-500 ease-in-out", 
              (showSearchInHeader || !isHomePage) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
            )}>
              <form className="w-full bg-white rounded-full p-1 flex items-center border shadow-sm relative">
                  <div className="flex-grow h-6 ml-3">
                    <AnimatedPlaceholder placeholders={frequentSearches} />
                  </div>
                  <Input
                    type="search"
                    className="absolute inset-0 w-full h-full bg-transparent border-none focus-visible:ring-0 text-base text-gray-800 placeholder:text-transparent px-4 z-10"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-accent hover:bg-accent/90 h-8 w-8 z-20">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                  </Button>
              </form>
            </div>

            {/* Navigation Links */}
            <nav className={cn(
                "flex items-center gap-4 transition-opacity",
                (showSearchInHeader || !isHomePage) ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}>
                <ProductsDropdown />
                {navLinks.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={cn("px-4 py-2 text-sm font-semibold", navAndIconClasses, navLinkHoverClasses)}
                    >
                    {link.name}
                    </Link>
                ))}
            </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-shrink-0 items-center justify-end gap-2">
          {/* Mobile Search - separate from desktop logic */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("rounded-full lg:hidden", navAndIconClasses, iconButtonHoverClasses)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Search Products</DialogTitle>
              </DialogHeader>
              <form className="relative mt-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-full pl-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute left-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-muted-foreground"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Submit Search</span>
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <ShoppingCart />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("md:w-auto md:px-3 md:gap-2 rounded-full", navAndIconClasses, iconButtonHoverClasses)}>
                <User className="h-5 w-5" />
                <span className="hidden md:inline">{user ? user.username : 'Sign In'}</span>
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
                  <DropdownMenuItem onClick={() => setUser(null)}>
                    Log out
                  </DropdownMenuItem>
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("lg:hidden rounded-full", navAndIconClasses, iconButtonHoverClasses)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo Alpha.png"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                            <span className="text-lg font-bold font-headline text-primary">
                                Alpha Electricals
                            </span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
              <div className="flex h-full flex-col">
                <nav className="flex flex-col gap-2 p-4">
                  <h3 className="px-2 text-sm font-semibold text-muted-foreground">
                    Products
                  </h3>
                  {productCategories.map((category) => (
                    <SheetClose asChild key={category.name}>
                      <Link
                        href={category.href}
                        className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={24}
                          height={24}
                        />
                        <span>{category.name}</span>
                      </Link>
                    </SheetClose>
                  ))}
                  <DropdownMenuSeparator />
                  <h3 className="px-2 text-sm font-semibold text-muted-foreground">
                    Menu
                  </h3>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t p-4">
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Link
                          href="/seller/profile"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <User className="h-5 w-5" />
                          My Account
                        </Link>
                      </SheetClose>
                      <Button variant="outline" onClick={() => setUser(null)}>
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => setUser({ username: 'JaneDoe' })}
                      >
                        Sign In
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/seller/profile">Create Account</Link>
                      </Button>
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
