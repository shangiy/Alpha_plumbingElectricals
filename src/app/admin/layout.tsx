
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
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Package, LogOut, Settings, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <Link href="/" className="flex items-center gap-2">
                <Image src="/logo Alpha.png" alt="Logo" width={40} height={40}/>
                <span className="text-lg font-semibold">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={true}>
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
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Support">
                        <Link href="#">
                            <LifeBuoy />
                            <span>Support</span>
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
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 sticky top-0 bg-background z-10">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                    {/* You can add breadcrumbs or page titles here */}
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
