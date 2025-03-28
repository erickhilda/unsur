import { AppSidebar } from '@/components/layout/app-sidebar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ElementStoreProvider } from '@/hooks/use-element-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-auto bg-background dark">
        <SidebarProvider>
          <ElementStoreProvider>
            <AppSidebar />

            <SidebarInset>
              <header
                className={cn(
                  'sticky top-0 flex h-12 shrink-0 items-center justify-between gap-2 px-4 z-10',
                  'border-b backdrop-filter backdrop-blur-sm shadow-md shadow-border'
                )}
              >
                <div className="flex gap-2 items-center ml-auto">
                  <Link href="/acknowledment">
                    <Button
                      data-sidebar="trigger"
                      variant="secondary"
                      size="icon"
                      className={cn('h-7 w-7')}
                    >
                      <Icon icon="lucide:link" height={28} width={28} />
                      <span className="sr-only">Acknowledment</span>
                    </Button>
                  </Link>
                  <Link href="https://github.com/erickhilda/unsur">
                    <Button
                      data-sidebar="trigger"
                      variant="secondary"
                      size="icon"
                      className={cn('h-7 w-7')}
                    >
                      <Icon icon="lucide:github" height={28} width={28} />
                      <span className="sr-only">Github Repository Link</span>
                    </Button>
                  </Link>
                </div>
              </header>
              {children}
            </SidebarInset>
          </ElementStoreProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
