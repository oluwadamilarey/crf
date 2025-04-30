'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { ComponentPropsWithRef, useState } from 'react';
import { RiEyeCloseLine } from 'react-icons/ri';
import { VscEye } from 'react-icons/vsc';

import { cn } from '@/lib/utils';

import InputError from '@/components/gen-input/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const inputVariants = cva(
  cn(
    'flex w-full rounded-none border border-[#eeeeee] h-[44px]',
    'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none',
    'focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring focus:outline-none focus:ring-2 focus:border-transparent',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'border bg-input-bg border-input-border placeholder:font-normal placeholder:text-ring',
        ),
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

type GenInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  ComponentPropsWithRef<'input'> &
  VariantProps<typeof inputVariants> &
  Partial<FieldInputProps<string>> &
  Partial<FieldMetaProps<string>> & {
    error?: string;
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
  };

const GenInput = ({
  className,
  error,
  label,
  touched,
  labelClassName,
  containerClassName,
  variant,
  size_variant,
  type,
  initialValue,
  ref,
  ...rest
}: GenInputProps) => {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.value;

  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = (): void => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-start w-full',
        containerClassName,
      )}
    >
      {rest.id && label && (
        <Label
          htmlFor={rest.id}
          className={cn('font-medium text-gray-800 text-sm', labelClassName)}
        >
          {label}
        </Label>
      )}
      <div className='w-full relative'>
        <Input
          type={type === 'password' ? (hidden ? 'password' : 'text') : type}
          className={cn(inputVariants({ variant, size_variant, className }))}
          defaultValue={initialValue}
          ref={ref}
          {...rest}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={toggleVisibility}
            className='absolute top-1/2 -translate-y-1/2 right-4 text-ring select-none text-base font-medium'
          >
            {hidden ? <VscEye /> : <RiEyeCloseLine />}
          </button>
        )}
      </div>

      <InputError isError={!!touched && !!error} error={error} />
    </div>
  );
};

export default GenInput;
