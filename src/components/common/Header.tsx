'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { User, Menu, ChevronDown, Search } from 'lucide-react';
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

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(!isHomePage);
  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false);
  const productsMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isHomePage) {
      setIsHeaderOpaque(true);
      return;
    }
    
    const handleScroll = () => {
      setIsHeaderOpaque(window.scrollY > 50);
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
    "transition-colors font-semibold",
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
                <Link href="#" className={cn("flex items-center gap-1 px-4 py-2 text-sm", navAndIconClasses, "hover:text-red-500")}>
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
        <div className="hidden lg:flex items-center justify-end gap-2">
            <nav className='flex items-center gap-2'>
                <ProductsDropdown />
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn("px-4 py-2 text-sm", navAndIconClasses, "hover:text-red-500")}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Far Right Icons */}
            <div className="flex items-center gap-1 ml-4">
                <ShoppingCart />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn("w-auto px-3 gap-2 rounded-md", navAndIconClasses, "hover:text-red-500")}>
                        <User className="h-5 w-5" />
                        <span className="text-sm">{user ? user.username : 'Sign In'}</span>
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
