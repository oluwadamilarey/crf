'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

type DialogProps = PropsWithChildren & {
  isOpen: boolean;
  onOpenChange(open: boolean): void;
  modalTitle: string;
  description: string;
  onConfirm?(): void;
  isLoading?: boolean;
  isSuccess?: boolean;
  proceedLabel?: string;
  cancelLabel?: string;
  icon?: React.ReactElement;
  confirmButtonVariant?: 'default' | 'destructive' | 'secondary' | 'ghost';
  confirmButtonClassName?: string;
  cancelButtonVariant?: 'ghost' | 'secondary' | 'default' | 'destructive';
  cancelButtonClassName?: string;
};

const ConfirmDialog = ({
  onOpenChange,
  isOpen,
  modalTitle,
  description,
  onConfirm,
  isLoading,
  isSuccess,
  proceedLabel,
  cancelLabel,
  icon,
  confirmButtonClassName,
  confirmButtonVariant,
  cancelButtonClassName,
  cancelButtonVariant,
}: DialogProps) => {
  const closeFnRef = useRef(onOpenChange);
  closeFnRef.current = onOpenChange;

  useEffect(() => {
    if (isSuccess && !isLoading) {
      closeFnRef.current(false);
    }
  }, [isLoading, isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent className='w-[419px] flex flex-col gap-8 bg-white rounded-none'>
        <div className='w-full flex items-center justify-center flex-col gap-4 px-6 pt-10 md:pt-20'>
          {!!icon && (
            <div className='size-16 w-fit flex items-center justify-center'>
              {icon}
            </div>
          )}
          <div className='w-full flex flex-col justify-center items-center gap-2 max-w-[231px] mx-auto text-center'>
            <DialogTitle className='text-gray-800 font-bold text-base leading-1 tracking-tight'>
              {modalTitle}
            </DialogTitle>
            <DialogDescription className='text-xs leading-1 text-grey-600'>
              {description}
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className='flex flex-col md:flex-row w-full gap-2'>
          {!!onConfirm && (
            <Button
              className={`w-full flex-1 ${confirmButtonClassName}`}
              variant={confirmButtonVariant || 'default'}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {proceedLabel || 'Yes, Confirm'}
            </Button>
          )}

          <Button
            className={`w-full flex-1 ${cancelButtonClassName}`}
            variant={cancelButtonVariant || 'ghost'}
            onClick={onOpenChange.bind(null, false)}
            isDisabled={isLoading}
          >
            {cancelLabel || 'Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
