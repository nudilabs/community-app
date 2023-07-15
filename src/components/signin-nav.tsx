'use client';

import { Button } from './ui/button';
import { useState } from 'react';

import { Icons } from './icons';
import { useRouter } from 'next/navigation';

export function SigninNav({
  className,
  text = 'Sign in',
}: {
  className?: string;
  text?: string;
} = {}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      className={className}
      disabled={loading}
      size={loading ? 'icon' : 'sm'}
      onClick={() => {
        setLoading(true);
        router.push('/signin');
        setLoading(false);
      }}
    >
      {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}{' '}
      {!loading && text}
    </Button>
  );
}
