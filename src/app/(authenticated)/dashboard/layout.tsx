import { PropsWithChildren } from 'react';

import Sidebar from '@/app/(authenticated)/dashboard/_components/Sidebar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full bg-surface-primary pb-[120px]'>
      <Sidebar />
      <main className='w-full min-h-screen transition-all pl-0 lg:pl-[var(--sidebar-padding,15rem)]'>
        <section className='w-full max-w-[80rem] mx-auto px-6 lg:px-8'>
          {children}
        </section>
      </main>
    </div>
  );
}
