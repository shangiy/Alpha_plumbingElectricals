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
import { User, Menu, ChevronDown, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
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
import HeroSearch from './HeroSearch';

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
  const [showSearchInHeader, setShowSearchInHeader] = useState(!isHomePage);

  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false);
  const productsMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isHomePage) {
      setIsHeaderOpaque(true);
      setShowSearchInHeader(true);
      return;
    }
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsHeaderOpaque(scrollY > 50);
        setShowSearchInHeader(scrollY > 300);
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

  const dynamicColorClasses = cn(
    "transition-colors",
    !isHeaderOpaque && isHomePage ? "text-white" : "text-[#2b235f]"
  );
  
  const navAndIconClasses = cn(
    "font-semibold text-base",
    dynamicColorClasses,
    "hover:text-[#8a0b0d]"
  );

  const logoTextClasses = cn(
    "hidden sm:flex flex-col",
    dynamicColorClasses,
    "group-hover:text-[#8a0b0d]"
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

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden h-24 w-full items-center gap-4 lg:flex">
            {/* Left: Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-3 group">
                <Image
                    src="/logo Alpha.png"
                    alt="Alpha Electricals & Plumbing Ltd Logo"
                    width={70}
                    height={70}
                    className="h-auto"
                />
                <div className={logoTextClasses}>
                    <span className="font-bold text-[18px] leading-tight">Alpha</span>
                    <div className="w-full h-px bg-current" />
                    <span className="text-[11px] leading-tight">Electricals & Plumbing Ltd</span>
                </div>
            </Link>
            
            {/* Center: Search */}
            <div className="flex-1 w-full max-w-xl mx-auto">
                {showSearchInHeader && (
                    <div className="animate-in fade-in duration-300">
                        <HeroSearch />
                    </div>
                )}
            </div>

            {/* Right: Navigation and Icons */}
            <div className="flex items-center justify-end">
                <nav className='flex items-center'>
                    <div onMouseEnter={handleProductsMenuEnter} onMouseLeave={handleProductsMenuLeave} className="flex items-center">
                        <DropdownMenu open={isProductsMenuOpen} onOpenChange={setProductsMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Link href="#" className={cn("flex items-center gap-1 px-3 py-2 whitespace-nowrap", navAndIconClasses)}>
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn("px-3 py-2 whitespace-nowrap", navAndIconClasses)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center">
                    <ShoppingCart triggerClassName={cn(navAndIconClasses, '[&_svg]:h-7 [&_svg]:w-7')} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={cn("w-auto px-3 gap-2 rounded-md", navAndIconClasses)}>
                            <User className="h-7 w-7" />
                            <span className="hidden md:inline">{user ? user.username : 'Sign In'}</span>
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
        </div>


        {/* Mobile Header */}
        <div className="w-full lg:hidden flex flex-col gap-4 py-3">
            {/* Top Row: Logo & Icons */}
            <div className="flex w-full items-center justify-between">
                 <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo Alpha.png"
                        alt="Alpha Electricals & Plumbing Ltd Logo"
                        width={70}
                        height={70}
                        className="h-auto w-[60px]"
                    />
                </Link>

                <div className="flex items-center">
                    <ShoppingCart triggerClassName={cn(navAndIconClasses, '[&_svg]:h-7 [&_svg]:w-7')} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className={cn("rounded-full", navAndIconClasses, '[&_svg]:h-7 [&_svg]:w-7')}>
                                <User />
                                <span className="sr-only">Account</span>
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={cn("rounded-full", navAndIconClasses, '[&_svg]:h-7 [&_svg]:w-7')}>
                                <Menu />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                            <SheetHeader className="p-4 border-b">
                                <SheetTitle>
                                    <SheetClose asChild>
                                        <Link href="/" className="flex items-center gap-2">
                                            <Image src="/logo Alpha.png" alt="Logo" width={60} height={60}/>
                                            <div className="flex flex-col text-[#2b235f]">
                                                <span className="font-bold text-[18px] leading-tight">Alpha</span>
                                                <div className="w-full h-px bg-[#2b235f]" />
                                                <span className="text-[11px] leading-tight">Electricals & Plumbing Ltd</span>
                                            </div>
                                        </Link>
                                    </SheetClose>
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="flex-1">
                                <nav className="flex flex-col gap-2 p-4">
                                <h3 className="px-2 text-sm font-semibold text-muted-foreground">Products</h3>
                                {productCategories.map((category) => (
                                    <SheetClose asChild key={category.name}>
                                    <Link href={category.href} className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">
                                        <Image src={category.icon} alt={category.name} width={24} height={24}/>
                                        <span>{category.name}</span>
                                    </Link>
                                    </SheetClose>
                                ))}
                                <DropdownMenuSeparator />
                                <h3 className="px-2 pt-2 text-sm font-semibold text-muted-foreground">Menu</h3>
                                {[ ...navLinks, { name: 'Team', href: '/team' }].map((link) => (
                                    <SheetClose asChild key={link.name}>
                                    <Link href={link.href} className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">{link.name}</Link>
                                    </SheetClose>
                                ))}
                                {user && (
                                    <>
                                    <DropdownMenuSeparator />
                                    <h3 className="px-2 pt-2 text-sm font-semibold text-muted-foreground">My Account</h3>
                                    <SheetClose asChild><Link href="/seller/profile" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">Profile</Link></SheetClose>
                                    <SheetClose asChild><Link href="#" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">My Orders</Link></SheetClose>
                                    <SheetClose asChild><Link href="/wishlist" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">My Wishlist</Link></SheetClose>
                                    <SheetClose asChild><Link href="/seller/profile" className="flex items-center gap-3 rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-[#8a0b0d]">Settings</Link></SheetClose>
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
             {/* Bottom Row: Search Bar - Always visible */}
             {showSearchInHeader && (
                <div className="px-0 animate-in fade-in duration-300">
                    <HeroSearch />
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
