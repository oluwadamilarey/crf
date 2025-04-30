import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring ring-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    'ring-ring cursor-pointer rounded-none leading-1 tracking-tight text-sm font-bold',
  ),
  {
    variants: {
      variant: {
        default: 'bg-brand-primary text-white hover:bg-brand-primary/90',
        secondary: 'bg-brand-dark text-white hover:bg-brand-dark/90',
        ghost: 'bg-surface-primary text-brand-dark hover:bg-surface-primary/90',
        link: 'text-brand-primary underline-offset-1 underline',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        'destructive-text':
          'bg-white text-destructive hover:bg-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-brand-primary bg-white text-brand-primary shadow-xs',
      },
      size: {
        default: 'px-6 py-3 text-sm md:text-base',
        sm: 'px-3 py-2.5',
        text: 'text-sm md:text-base',
        button:
          'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
        icon: 'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// Add a Spinner component for the loading state
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  isDisabled = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled || disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className='size-4' />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };

export type ButtonProps = React.ComponentProps<typeof Button>;
