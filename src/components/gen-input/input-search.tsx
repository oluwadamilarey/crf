'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';

const _inputVariants = cva(
  cn(
    'flex w-full rounded-lg border',
    'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none',
    'focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none focus-visible:ring',
  ),
  {
    variants: {
      variant: {
        primary: cn('border-[#585858] bg-white focus:border-[#585858]'),
      },

      size_variant: {
        sm: 'px-2 py-1 text-base',
        base: 'p-4 text-base',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size_variant: 'base',
    },
  },
);

export interface InputSearchProp
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof _inputVariants> {
  isLoading?: boolean;
  touched?: boolean;
  error?: string;
  inputClassName?: string;
  containerClassName?: string;
  updateQuery?: boolean;
  customSearch?: (search: string) => void;
  returnAfterCustomSearch?: boolean;
}

const InputSearch = ({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search');

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className={cn('relative w-full', className)}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-4 top-1/2 -translate-y-1/2'
      >
        <path
          d='M17.5 17.5L22 22'
          stroke='#667085'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z'
          stroke='#667085'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
      </svg>

      <input
        type='search'
        inputMode='search'
        className={cn(
          'outline-none focus:outline-none focus:ring-0 focus:border-[#D0D5DD] border-[#D0D5DD]',
          'border focus:border rounded-lg',
          'focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none focus-visible:ring-2',
          'transition duration-300 ease-linear',
          'bg-white py-3 pr-12 w-full',
        )}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder={placeholder || 'Search'}
        defaultValue={search || ''}
      />
    </div>
  );
};

export default InputSearch;
