'use client';
import { TrashIcon } from 'lucide-react';

import { useDisclosure } from '@/hooks/useDisclosure';

import GenInput from '@/components/gen-input/gen-input';
import ConfirmDialog from '@/components/gen-modal/confirm-dialog';
import InfoBanner from '@/components/InfoBanner';
import { Button } from '@/components/ui/button';

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        onOpenChange={onClose}
        modalTitle='Save edit?'
        onConfirm={() => {}}
        cancelButtonVariant='secondary'
        description='You’re about to update your recurring contribution schedule.'
        icon={<TrashIcon width='43px' height='43px' />}
      />
      <main className='pt-[30px]'>
        <div className='w-full flex flex-col pt-[30px] gap-[10px] max-w-[40rem] mx-auto'>
          <InfoBanner
            description='This is a sample description.'
            buttonText='Learn More'
            buttonUrl='https://example.com'
          />
          <Button>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
          <GenInput
            className=''
            error='Password don`t match'
            label='Password'
            type='password'
            id='password'
          />

          <Button onClick={onOpen}>Open Modal</Button>
        </div>
      </main>
      ;
    </>
  );
}
