'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

const productCategories = [
    { name: 'Tanks Collection', href: '#', icon: '/kentank 2000l.png' },
    { name: 'Plumbing Equipment', href: '#', icon: '/ppr pipes.png' },
    { name: 'Lighting & Electrical', href: '#', icon: '/decor lighting design.png' },
    { name: 'Home & Décor', href: '#', icon: '/square lights.png' },
    { name: 'Roofing & Construction', href: '#', icon: '/roof 2.png' },
];

const AccountDropdown = ({ isMobile = false }: { isMobile?: boolean }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <User className={isMobile ? "h-6 w-6" : "h-5 w-5"} />
        <span className="sr-only">Profile</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side={isMobile ? "top" : "bottom"}>
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
      <DropdownMenuItem asChild>
        <Link href="#">Settings</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="#">Log out</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

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
  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={50} height={50} />
            <span className="hidden text-xl font-bold font-headline text-primary md:block">Alpha Electricals & Plumbing Ltd</span>
            <span className="text-lg font-bold font-headline text-primary md:hidden">Alpha Electricals</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
            <ProductsDropdown />
          </nav>
        </div>

        <div className="hidden flex-1 justify-center px-8 lg:flex">
          <div className="w-full max-w-md">
            <form>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full rounded-full"
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <AccountDropdown />
          </div>
          
          <ShoppingCart />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2">
                   <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={50} height={50} />
                   <span className="text-xl font-bold font-headline text-primary">Alpha Electricals & Plumbing Ltd</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <DropdownMenuSeparator />
                  <h3 className="px-2 text-sm font-semibold text-muted-foreground">Products</h3>
                  {productCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-3 py-2 text-lg font-medium text-foreground hover:text-primary"
                    >
                      <Image src={category.icon} alt={category.name} width={24} height={24} />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex items-center justify-end gap-4 border-t pt-4">
                   <AccountDropdown isMobile={true} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
