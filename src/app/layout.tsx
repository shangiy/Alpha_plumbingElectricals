
'use client';

import type { Metadata } from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { CartProvider } from '@/context/CartProvider';
import { AuthProvider } from '@/context/AuthProvider';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { ProductProvider } from '@/context/ProductProvider';
import Chatbot from '@/components/common/Chatbot';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '600', '700'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          poppins.variable,
          ptSans.variable
        )}
      >
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <div className="relative flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex flex-col">{children}</main>
                {!isAdminRoute && <Footer />}
              </div>
              
              {!isAdminRoute && (
                <>
                  {/* Chatbot and its trigger */}
                  <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
                  
                  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                    {!isChatbotOpen && (
                      <Button 
                        onClick={() => setIsChatbotOpen(true)}
                        className="h-auto rounded-full bg-[#007bff] px-4 py-2 text-base font-semibold text-white shadow-lg hover:bg-[#0056b3] animate-in fade-in zoom-in-95"
                        aria-label="Toggle Chatbot"
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Alpha AI
                      </Button>
                    )}
                    <ScrollToTopButton />
                  </div>

                  {/* Other floating buttons */}
                  <WhatsAppButton />
                </>
              )}
              <Toaster />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
        <Script src="https://js.paystack.co/v1/inline.js" />
      </body>
    </html>
  );
}
