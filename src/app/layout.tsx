
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
import { Bot, MessageSquare, X } from 'lucide-react';

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
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              
              {/* Chatbot and its trigger */}
              <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
              
              <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                 <Button
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    className="h-auto rounded-full bg-[#007bff] px-4 py-2 text-base font-semibold text-white shadow-lg hover:bg-[#0056b3]"
                    aria-label="Toggle Chatbot"
                  >
                    {isChatbotOpen ? (
                        <div className="flex items-center gap-2">
                           <X className="h-5 w-5" />
                           <span>Close</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            <span>Alpha AI</span>
                        </div>
                    )}
                  </Button>
                <ScrollToTopButton />
              </div>

              {/* Other floating buttons */}
              <WhatsAppButton />
              <Toaster />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
