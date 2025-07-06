'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, User, Menu } from 'lucide-react';
import ShoppingCart from './ShoppingCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
        <Link href="#">Settings</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="#">Log out</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function Header() {
  const navLinks = [
    { name: 'Categories', href: '#' },
    { name: 'Sell with Us', href: '/seller/profile' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={28} height={28} />
            <span className="hidden text-xl font-bold font-headline text-primary md:block">Alpha Electricals & Plumbing Ltd</span>
            <span className="text-lg font-bold font-headline text-primary md:hidden">Alpha Electricals</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
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
                   <Image src="/logo Alpha.png" alt="Alpha Electricals & Plumbing Ltd Logo" width={28} height={28} />
                   <span className="text-xl font-bold font-headline text-primary">Alpha Electricals & Plumbing Ltd</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
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
