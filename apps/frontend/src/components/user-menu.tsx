'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className='h-8 w-8 animate-pulse rounded-full bg-muted' />;
  }

  if (session) {
    return (
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className='h-8 w-8 rounded-full border'
            />
          ) : (
            <div className='flex h-8 w-8 items-center justify-center rounded-full border bg-muted'>
              <span className='text-xs font-medium'>
                {session.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          )}
          <span className='hidden text-sm font-medium md:block'>
            {session.user?.name}
          </span>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button size='sm' onClick={() => signIn('google')}>
      Login
    </Button>
  );
}
