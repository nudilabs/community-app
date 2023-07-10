'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export function Signin() {
  return (
    <div>
      <Button
        size="sm"
        onClick={() =>
          signIn('twitter', {
            callbackUrl: 'http://localhost:3000/',
          })
        }
      >
        Sign In
      </Button>
    </div>
  );
}
