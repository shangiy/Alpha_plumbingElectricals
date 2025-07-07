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
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, User, Menu, ChevronDown, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import ShoppingCart from './ShoppingCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const productCategories = [
  { name: 'Tanks Collection', href: '/tanks', icon: '/kentank 2000l.png' },
  { name: 'Plumbing Equipment', href: '#', icon: '/ppr pipes.png' },
  {
    name: 'Lighting & Electrical',
    href: '#',
    icon: '/decor lighting design.png',
  },
  { name: 'Home & Décor', href: '#', icon: '/square lights.png' },
  { name: 'Roofing & Construction', href: '#', icon: '/roof 2.png' },
];

const ProductsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
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

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  
  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        {/* Left Group: Logo & Name */}
        <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
                <Image
                src="/logo Alpha.png"
                alt="Alpha Electricals & Plumbing Ltd Logo"
                width={90}
                height={90}
                className="h-auto"
                />
            </Link>
            <span className="hidden text-xl font-bold font-headline text-primary md:block">
                Alpha Electricals
            </span>
        </div>

        {/* Center Group: Nav (Desktop) */}
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

        {/* Right Group: Icons & Actions */}
        <div className="flex items-center gap-2">
           {/* Search Dialog (for all screen sizes) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
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
              <Button variant="ghost" size="icon" className="md:w-auto md:px-3 md:gap-2 rounded-full">
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

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <div className='p-4'>
                    <Link href="/" className="mb-4 flex items-center gap-2">
                      <Image
                        src="/logo Alpha.png"
                        alt="Logo"
                        width={90}
                        height={90}
                      />
                      <span className="text-lg font-bold font-headline text-primary">
                        Alpha Electricals
                      </span>
                    </Link>
                </div>
                <DropdownMenuSeparator />
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
