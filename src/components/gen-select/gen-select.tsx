'use client';

import { FormikErrors } from 'formik';
import { useId, useMemo } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';

import { cn } from '@/lib/utils';

import InputError from '@/components/gen-input/input-error';
import { Label } from '@/components/ui/label';

const _InputVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const _InputSize = ['sm', 'base'] as const;

type SelectProps = React.SelectHTMLAttributes<
  HTMLSelectElement | HTMLInputElement
> & {
  label?: string;
  labelClassName?: string;
  options: SelectOption[];
  newValue?: string[];
  variant?: (typeof _InputVariant)[number];
  size_variant?: (typeof _InputSize)[number];
  className?: string;
  id: string;
  error?: boolean | string;
  touched?: boolean;
  setValue?: (
    value: string | string[],
    shouldValidate: boolean,
  ) => Promise<void | FormikErrors<unknown>>;
  setTouched?: (
    touched: boolean,
    shouldValidate: boolean,
  ) => Promise<void | FormikErrors<unknown>>;
  value?: string | string[];
  isLoading?: boolean;
  multiple?: boolean;
  placeholder?: string;
};
export type SelectOption = { readonly value: string; readonly label: string };

const GenSelect = ({
  label,
  className,
  labelClassName,
  id,
  required,
  setTouched,
  setValue,
  placeholder,
  value,
  options,
  disabled,
  name,
  error,
  touched,
  isLoading,
  multiple,
  variant = 'primary',
}: SelectProps) => {
  const handleChange = async (
    option: SingleValue<SelectOption> | MultiValue<SelectOption> | null,
  ) => {
    // logic here

    await setTouched?.(true, true);

    if (setValue && option && 'value' in option && !multiple) {
      await setValue(option.value, true);

      return;
    }

    if (setValue && option && Array.isArray(option) && multiple) {
      const newValue = (option as MultiValue<SelectOption>).map(
        (item) => item.value,
      );

      await setValue(newValue, true);
    }
  };

  const handleBlur = async () => {
    if (setTouched) {
      await setTouched(true, true);
    }
  };

  const selectedValue: SingleValue<SelectOption> | MultiValue<SelectOption> =
    useMemo(() => {
      if (!multiple) {
        if (!value || !options) {
          return {
            value: '',
            label: placeholder ? placeholder : 'Select Option',
          };
        }
        const findSelected = options.find((option) => option.value === value);

        if (!findSelected) {
          return {
            value: '',
            label: placeholder ? placeholder : 'Select Option',
          };
        }
        return findSelected;
      }

      if (multiple && Array.isArray(value) && options) {
        const valuesSet = new Set(value);
        return options.filter((option) => valuesSet.has(option.value));
      }

      return [] as SelectOption[];
    }, [options, value, placeholder, multiple]);

  return (
    <div
      className={cn('w-full outline-none border-none focus:ring-0', className)}
    >
      <div className='flex flex-col gap-2'>
        {label && !!label.length && id && (
          <Label
            htmlFor={id}
            className={cn('font-normal text-sm', labelClassName)}
          >
            {label}
          </Label>
        )}
        <ReactSelect
          placeholder={`${placeholder ? placeholder : 'Select Option'}`}
          value={selectedValue}
          options={options}
          onBlur={handleBlur}
          onFocus={handleBlur}
          id={id}
          onChange={handleChange}
          isDisabled={disabled || isLoading}
          required={required}
          name={name}
          captureMenuScroll={true}
          instanceId={useId()}
          isLoading={isLoading}
          isMulti={multiple}
          classNames={{
            option: (state) =>
              cn(
                'hover:bg-primary hover:text-white p-2 bg-transparent focus:bg-primary focus-within:bg-primary capitalize',
                [state.isSelected && 'font-semibold'],
                [state.isFocused && 'bg-primary bg-opacity-10'],
                [variant === 'primary' && 'text-base'],
              ),
            control: () =>
              cn(
                `w-full rounded-lg border p-3.5 capitalize outline-none transition-all duration-300 ease-in placeholder:text-base md:px-4 xl:placeholder:text-base flex`,
                variant === 'primary' &&
                  'border bg-input-bg border-input-border placeholder:font-normal placeholder:text-ring',
              ),
            placeholder: () =>
              'text-secondary-grey text-base md:text-base lg:text-base',
            noOptionsMessage: () => 'text-base lg:text-base',
            dropdownIndicator: () => cn('text-primary-black/80 p-0'),
            input: () => cn('p-0'),
            multiValue: () => 'bg-primary/80 text-white flex rounded-sm px-1',
            multiValueLabel: () => 'text-[0.85em]',
            multiValueRemove: () => 'hover:bg-primary-red',
            valueContainer: () => cn([multiple && 'flex flex-wrap gap-1']),
          }}
          styles={{
            control: () => {
              return {};
            },
            option: () => ({}),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
              margin: 0,
              gap: '0.25rem',
            }),
            dropdownIndicator: () => ({}),
            input: (baseStyles) => ({ ...baseStyles, margin: 0, padding: 0 }),
            indicatorSeparator: () => ({}),
            placeholder: (base) => ({ ...base }),
            menuList: (base) => ({ ...base, maxHeight: '10rem' }),
            multiValue: () => ({}),
            multiValueLabel: () => ({}),
            multiValueRemove: () => ({}),
          }}
        />

        <InputError
          isError={
            !!error &&
            !!touched &&
            ((!value && !multiple) || (!!multiple && !value?.length))
          }
          error={error as string}
        />
      </div>
    </div>
  );
};

export default GenSelect;
