'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useDisclosure } from '@/hooks/useDisclosure';

import { LogoutIcon } from '@/components/icons';

import LogoutDialog from '@/app/(authenticated)/dashboard/_components/LogoutDialog';
import SidebarItem from '@/app/(authenticated)/dashboard/_components/SidebarItem';
import { SIDEBAR_ITEMS } from '@/constant/appConsants';

export default function Sidebar() {
  const {
    isOpen: isLogoutOpen,
    onOpen: setLogoutOpen,
    onClose: setLogoutClose,
  } = useDisclosure();

  return (
    <>
      <LogoutDialog isOpen={isLogoutOpen} onOpenChange={setLogoutClose} />

      <aside
        className={cn(
          'w-56 h-0 lg:h-screen bg-brand-dark hidden lg:!flex py-6',
          'flex-col gap-4 justify-start fixed left-0 top-0 z-50 transition-all',
        )}
      >
        <div className={cn('flex justify-center items-center py-6')}>
          <Link href='/dashboard' className='size-fit h-[78px]'>
            <Image
              src='/svg/crf-logo.svg'
              width={224}
              height={78}
              alt='Contributory Reserve Fund'
              className='size-full shrink-0 aspect-auto'
              priority
            />
          </Link>
        </div>
        <nav
          className={cn(
            'flex-1 px-3 w-full flex flex-col justify-start items-start gap-4 mb-8 overflow-auto',
          )}
        >
          <ul className='w-full flex flex-col justify-start items-start gap-1'>
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.url} className='w-full'>
                <SidebarItem link={item} />
              </li>
            ))}
          </ul>
        </nav>
        <div className='w-full px-3'>
          <SidebarItem
            isLogout
            onClick={() => setLogoutOpen()}
            link={{
              icon: LogoutIcon,
              label: 'Log Out',
              url: '',
            }}
          />
        </div>
      </aside>
    </>
  );
}
