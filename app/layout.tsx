import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import DynamicMetadata from '@/components/DynamicMetadata';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DynamicMetadata />
      <body className={inter.className}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          </div>
        }>
          <ThemeProvider>
            {children}
            <Toaster 
              position="top-center" 
              richColors 
              closeButton 
              duration={4000}
              toastOptions={{
                style: {
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  color: '#374151',
                },
              }}
            />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}