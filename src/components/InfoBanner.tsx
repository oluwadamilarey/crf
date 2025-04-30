import Link from 'next/link';
import { ReactElement } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

type InfoBannerProps = {
  description: string;
  buttonText: string;
  buttonUrl: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
};

export default function InfoBanner({
  description,
  buttonText,
  buttonUrl,
  icon: Icon,
  iconPosition = 'right',
}: InfoBannerProps) {
  return (
    <div
      className={cn(
        'w-full p-6  flex flex-col md:flex-row items-center justify-start md:justify-between gap-6 bg-no-repeat bg-size-[221px_89px] bg-blend-screen bg-right-top',
      )}
      style={{
        backgroundImage: `linear-gradient(to right, black, #E2943E), url('/images/sparkle.png')`,
      }}
    >
      <h2 className='text-base font-bold tracking-tight leading-1 text-white max-w-[367px]'>
        {description}
      </h2>
      <Link href={buttonUrl}>
        <Button
          variant='secondary'
          className='w-[150px] h-11 text-sm flex items-center gap-2 z-20'
        >
          {iconPosition === 'left' && Icon}
          {buttonText}
          {iconPosition === 'right' && Icon}
        </Button>
      </Link>
    </div>
  );
}
