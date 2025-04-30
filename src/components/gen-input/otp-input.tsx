import { FieldHelperProps, FieldInputProps, FieldMetaProps } from 'formik';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { cn } from '@/lib/utils';

import InputError from '@/components/gen-input/input-error';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

type OtpInputProps = FieldHelperProps<unknown> &
  FieldInputProps<string> &
  FieldMetaProps<string> & {
    id: string;
    numberOfSlots: number;
    autoFocus?: boolean;
    className?: {
      inputSlot?: string;
    };
  };

const OtpInput = ({
  name,
  id,
  value,
  setValue,
  onBlur,
  numberOfSlots,
  touched,
  error,
  autoFocus,
  className,
}: OtpInputProps) => {
  const slots = Array.from({ length: numberOfSlots }, (_, index) => index);

  return (
    <div className={cn('flex flex-col gap-2 justify-center')}>
      <div className='flex items-center justify-center gap-4'>
        <InputOTP
          pattern={REGEXP_ONLY_DIGITS}
          maxLength={numberOfSlots}
          className='w-full'
          id={id}
          name={name}
          onFocus={onBlur}
          onBlur={onBlur}
          onChange={(value) => {
            setValue(value, true);
          }}
          value={value}
          autoFocus={autoFocus}
        >
          {slots.map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot
                className={cn([
                  error && touched && 'border-danger/70',
                  !error &&
                    touched &&
                    'border-primary-green ring-primary/50 ring-offset-2',
                  className?.inputSlot,
                ])}
                index={index}
              />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>

      <InputError isError={!!touched && !!error} error={error} />
    </div>
  );
};

export default OtpInput;
