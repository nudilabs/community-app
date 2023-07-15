'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { useState } from 'react';
import { ButtonLoading } from './button-loading';

export function Signin() {
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    await signIn('twitter', {
      callbackUrl: 'http://localhost:3000/',
    });
    setLoading(false);
  };
  return (
    <div>
      {!loading ? (
        <Button size="sm" onClick={handleSignin}>
          Sign In
        </Button>
      ) : (
        <ButtonLoading icon />
      )}
    </div>
  );
}
