import ConfirmDialog from '@/components/gen-modal/confirm-dialog';
import { InfoIcon } from '@/components/icons';

type LogoutDialogProps = {
  isOpen: boolean;
  onOpenChange(open: boolean): void;
};

export default function LogoutDialog({
  isOpen,
  onOpenChange,
}: LogoutDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalTitle='Logout?'
      description='Are you sure you want to logout of this account? You will be able to sign in back.'
      onConfirm={() => {}}
      proceedLabel='Yes, Logout'
      confirmButtonVariant='ghost'
      cancelButtonVariant='ghost'
      icon={<InfoIcon />}
      confirmButtonClassName='text-[#D2292C]'
    />
  );
}
