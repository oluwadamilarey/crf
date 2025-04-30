'use client';

import { AppProgressProvider } from '@bprogress/next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '@/components/ui/sonner';

import { AppStore, makeStore } from '@/store';

const Providers = ({
  children,
  session,
}: PropsWithChildren & { session: Session | null }) => {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<Persistor>({} as Persistor);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <SessionProvider session={session}>
      <Provider store={storeRef.current}>
        <AppProgressProvider
          height='4px'
          color='#e2943e'
          options={{ showSpinner: false }}
          shallowRouting
        >
          <PersistGate loading={null} persistor={persistorRef.current} />
          {children}
          <Toaster />
        </AppProgressProvider>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
