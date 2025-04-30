'use server';
import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';

export async function signInAction(data: { email: string; password: string }) {
  try {
    const res = await signIn('login', { redirect: false, ...data });

    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        // TODO: HANDLE THIS ERROR
        // error: error.cause?.err?.message,
        error: 'Handle this error',
      };
    }

    return {
      error: 'Something went wrong',
    };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login', redirect: true });
}
