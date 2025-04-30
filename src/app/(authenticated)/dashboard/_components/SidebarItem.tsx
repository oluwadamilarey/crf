'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

export type SidebarItems = {
  url: string;
  label: string;
  icon: IconType;
};

type SidebarItemProps = {
  link: SidebarItems;
  isLogout?: boolean;
  isSidebarOpen?: boolean;
  onClick?(): void;
};

export default function SidebarItem({
  link,
  isLogout,

  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = useMemo(
    () =>
      (pathname.toLowerCase().includes(link.url.toLowerCase()) &&
        link.url.length > 1 &&
        link.url !== '/dashboard') ||
      pathname.toLowerCase() === link.url.toLowerCase(),
    [pathname, link.url],
  );

  const iconColor = useMemo(() => {
    if (isLogout) return '#eae1d7';
    return isActive ? '#e2943e' : '#eae1d7';
  }, [isLogout, isActive]);

  const content = (
    <span
      className={cn(
        'w-full flex flex-row justify-start items-center gap-2 py-4 px-2 text-nowrap',
        {
          'bg-[#2E1901] border-r-2 border-r-brand-primary':
            isActive && !isLogout,
        },
      )}
    >
      <link.icon className='shrink-0' stroke={iconColor} size='24px' />

      <span
        className={cn(
          'transition-all text-sm hidden md:flex text-brand-disabled font-normal',
          {
            'font-bold': isActive,
          },
        )}
      >
        {link.label}
      </span>
    </span>
  );

  const containerClasses = useMemo(
    () =>
      cn(
        'w-full flex items-start justify-start gap-3',
        'transition-all [&>*]:transition-all',
      ),
    [],
  );

  if (isLogout)
    return (
      <button className={containerClasses} onClick={onClick}>
        {content}
      </button>
    );

  return (
    <Link href={link.url} className={containerClasses} onClick={onClick}>
      {content}
    </Link>
  );
}
