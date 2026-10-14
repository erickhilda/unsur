'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Icon from '../ui/icon';
import HeaderLogo from './header-logo';

export default function AppHeader() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  return (
    <header
      className={cn(
        'top-0 flex h-12 shrink-0 items-center justify-between gap-2 px-4 z-10',
        'border-b backdrop-filter backdrop-blur-sm shadow-md shadow-border',
        isMobile ? 'max-w-[100vw]' : 'max-w-[calc(100vw - 16rem)]'
      )}
    >
      <div className="flex gap-2 items-center justify-between w-full">
        {pathname.includes('acknowledgment') || isMobile ? (
          <HeaderLogo />
        ) : null}
        <div className="flex gap-2 ml-auto">
          <Link href="/acknowledgment">
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
      </div>
    </header>
  );
}
