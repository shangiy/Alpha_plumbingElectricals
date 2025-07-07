'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    { name: 'Water Tanks', href: '/tanks' },
    { name: 'LED Lights', href: '/decor' },
    { name: 'PPR Pipes', href: '/plumbing' },
    { name: 'Solar Heaters', href: '/plumbing' },
];


export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(!isHomePage);
  const [isSearchDocked, setIsSearchDocked] = useState(false);
  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false);
  const productsMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isHomePage) {
      setIsHeaderOpaque(true);
      setIsSearchDocked(true);
      return;
    }
    
    const handleScroll = () => {
      // Opaque header appears sooner
      setIsHeaderOpaque(window.scrollY > 50);
      // Docked search appears later, when hero search is off-screen
      setIsSearchDocked(window.scrollY > 400); 
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);
  
  const navLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' },
  ];
  
  const headerClasses = cn(
    "sticky top-0 z-50 w-full transition-colors duration-300",
    isHeaderOpaque 
      ? "bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60" 
      : "bg-transparent border-b border-transparent"
  );

  const navAndIconClasses = cn(
    "transition-colors",
    !isHeaderOpaque && isHomePage ? "text-white" : "text-foreground"
  );
  
  const handleProductsMenuEnter = () => {
    if (productsMenuTimerRef.current) {
      clearTimeout(productsMenuTimerRef.current);
    }
    setProductsMenuOpen(true);
  };

  const handleProductsMenuLeave = () => {
    productsMenuTimerRef.current = setTimeout(() => {
      setProductsMenuOpen(false);
    }, 200);
  };

  const ProductsDropdown = () => (
     <div onMouseEnter={handleProductsMenuEnter} onMouseLeave={handleProductsMenuLeave} className="flex items-center">
        <DropdownMenu open={isProductsMenuOpen} onOpenChange={setProductsMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Link href="#" className={cn("flex items-center gap-1 px-4 py-2 text-sm font-semibold", navAndIconClasses, "hover:text-red-500")}>
                    Products
                    <ChevronDown className="h-4 w-4" />
                </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56" onMouseEnter={handleProductsMenuEnter} onMouseLeave={handleProductsMenuLeave}>
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
     </div>
  );

  // This SearchBar is only for mobile view, as desktop has the hero/docked search
  const SearchBar = ({ isMobile = false }) => {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const searchContainerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        }
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);
    
    if (isSearchOpen) {
        return (
            <form ref={searchContainerRef} className="relative flex items-center">
                <Input
                    type="search"
                    placeholder="Search..."
                    className={cn("rounded-full pl-4 pr-10 transition-all duration-300", isMobile ? "w-48" : "w-64")}
                    autoFocus
                />
                <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-muted-foreground"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </form>
        );
    }
    
    return (
        <Button variant="ghost" size="icon" className={cn("rounded-full", navAndIconClasses)} onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
        </Button>
    )
  }

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-24 items-center justify-between gap-4 px-4">
        {/* Left: Logo and Name */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-3">
          <Image
            src="/logo Alpha.png"
            alt="Alpha Electricals & Plumbing Ltd Logo"
            width={70}
            height={70}
            className="h-auto"
          />
           <span className={cn("hidden sm:inline-block font-bold text-xl", navAndIconClasses)}>Alpha Electricals</span>
        </Link>
        
        {/* Center/Right: Actions (Desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-end">
            <div className="flex-1 flex justify-center items-center relative h-12 overflow-hidden">
                {/* Nav Links - will animate out */}
                 <div
                    className={cn(
                        'flex items-center gap-1 transition-all duration-500 ease-in-out',
                        (isSearchDocked || !isHomePage) && 'opacity-0 -translate-y-4 pointer-events-none'
                    )}
                 >
                    <ProductsDropdown />
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn("px-4 py-2 text-sm font-semibold", navAndIconClasses, "hover:text-red-500")}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                
                {/* Docked Search Bar - will animate in */}
                 <div className={cn(
                    "absolute inset-x-0 mx-auto w-full max-w-lg transition-all duration-500 ease-in-out",
                    (isSearchDocked || !isHomePage) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}>
                    <form className="w-full bg-input rounded-full p-1 flex items-center shadow-inner relative h-12">
                        <div className="flex-grow h-6 ml-4">
                            <AnimatedPlaceholder placeholders={frequentSearches.map(s => s.name)} />
                        </div>
                        <Input
                            type="search"
                            className="absolute inset-0 w-full h-full bg-transparent border-none focus-visible:ring-0 text-base text-foreground placeholder:text-transparent px-6 z-10"
                        />
                        <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90 z-20 h-10 w-10">
                            <Search className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>

            {/* Far Right Icons */}
            <div className="flex items-center gap-1 ml-4">
                <ShoppingCart />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn("w-auto px-3 gap-2 rounded-md", navAndIconClasses, "hover:text-red-500")}>
                        <User className="h-5 w-5" />
                        <span className="text-sm font-semibold">{user ? user.username : 'Sign In'}</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    {user ? (
                        <>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/seller/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="#">My Orders</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/wishlist">My Wishlist</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/seller/profile">Settings</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setUser(null)}>Log out</DropdownMenuItem>
                        </>
                    ) : (
                        <>
                        <DropdownMenuItem onClick={() => setUser({ username: 'JaneDoe' })}>Sign In</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/seller/profile">Create Account</Link></DropdownMenuItem>
                        </>
                    )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        {/* Right: Actions (Mobile) */}
        <div className="flex lg:hidden items-center gap-1">
            <SearchBar isMobile={true} />
            <ShoppingCart />
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className={cn("rounded-full", navAndIconClasses)}>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>
                            <SheetClose asChild>
                                <Link href="/" className="flex items-center gap-2">
                                    <Image src="/logo Alpha.png" alt="Logo" width={60} height={60}/>
                                    <span className="text-lg font-bold font-headline text-primary">Alpha Electricals</span>
                                </Link>
                            </SheetClose>
                        </SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        <nav className="flex flex-col gap-2 p-4">
                          <h3 className="px-2 text-sm font-semibold text-muted-foreground">Products</h3>
                          {productCategories.map((category) => (
                            <SheetClose asChild key={category.name}>
                              <Link href={category.href} className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
                                <Image src={category.icon} alt={category.name} width={24} height={24}/>
                                <span>{category.name}</span>
                              </Link>
                            </SheetClose>
                          ))}
                          <DropdownMenuSeparator />
                          <h3 className="px-2 pt-2 text-sm font-semibold text-muted-foreground">Menu</h3>
                          {[ ...navLinks, { name: 'Team', href: '/team' }].map((link) => (
                            <SheetClose asChild key={link.name}>
                              <Link href={link.href} className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">{link.name}</Link>
                            </SheetClose>
                          ))}
                          {user && (
                            <>
                              <DropdownMenuSeparator />
                              <h3 className="px-2 pt-2 text-sm font-semibold text-muted-foreground">My Account</h3>
                              <SheetClose asChild><Link href="/seller/profile" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">Profile</Link></SheetClose>
                              <SheetClose asChild><Link href="#" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">My Orders</Link></SheetClose>
                              <SheetClose asChild><Link href="/wishlist" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">My Wishlist</Link></SheetClose>
                              <SheetClose asChild><Link href="/seller/profile" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">Settings</Link></SheetClose>
                            </>
                          )}
                        </nav>
                    </ScrollArea>
                    <div className="flex flex-col gap-2 border-t p-4 mt-auto">
                    {user ? (
                        <Button variant="outline" className="w-full" onClick={() => setUser(null)}>Log Out</Button>
                    ) : (
                        <div className="space-y-2">
                        <Button className="w-full" onClick={() => setUser({ username: 'JaneDoe' })}>Sign In</Button>
                        <SheetClose asChild>
                          <Link href="/seller/profile" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>Create Account</Link>
                        </SheetClose>
                        </div>
                    )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
