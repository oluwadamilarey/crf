import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

type InputErrorProps = {
  isError: boolean;
  error?: string;
};

const InputError = ({ error, isError }: InputErrorProps) => {
  return (
    <AnimatePresence>
      {isError && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className='text-xs font-semibold text-destructive'
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InputError;
