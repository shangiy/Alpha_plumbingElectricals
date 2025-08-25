
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, LogOut, Settings, Users, Receipt, Package, BarChart, Home } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthProvider';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/common/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (
    <AuthGuard allowedRoles={['admin', 'staff']}>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background">
          <Sidebar className="flex flex-col h-full">
            <SidebarHeader>
              <Link href="/admin" className="flex items-center gap-2">
                  <Image src="/logo Alpha.png" alt="Logo" width={40} height={40}/>
                  <span className="text-lg font-semibold">Admin Panel</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Products">
                    <Link href="/admin/products">
                      <Package />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Analytics">
                    <Link href="/admin/analytics">
                      <BarChart />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {user?.role === 'admin' && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Users">
                      <Link href="/admin/users">
                        <Users />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Transactions">
                    <Link href="/admin/transactions">
                      <Receipt />
                      <span>Transactions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Go to Homepage">
                          <Link href="/">
                              <Home />
                              <span>Homepage</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Settings">
                          <Link href="#">
                              <Settings />
                              <span>Settings</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={logout} tooltip="Log Out">
                          <LogOut />
                          <span>Log Out</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-1 flex-col overflow-hidden">
              <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-6 sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                      <SidebarTrigger className="md:hidden" />
                      <h1 className="text-lg font-semibold">Alpha Electricals - Admin</h1>
                  </div>
                  {user && (
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                  <Avatar className="h-9 w-9">
                                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                  </Avatar>
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                              <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
                  )}
              </header>
              <main className="flex-1 overflow-y-auto bg-muted/40">
                  <div className="p-4 md:p-6">
                      {children}
                  </div>
                  <Footer />
              </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
