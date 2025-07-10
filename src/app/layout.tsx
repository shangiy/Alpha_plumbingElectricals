
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
import { Bot, X } from 'lucide-react';

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
              <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
              <WhatsAppButton />
              <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
                 <Button
                    size="icon"
                    className="bg-[#0b748a] hover:bg-[#0b748a]/90 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
                    aria-label="Open AI Chat"
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                  >
                    {isChatbotOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
                  </Button>
                <ScrollToTopButton />
              </div>
              <Toaster />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
