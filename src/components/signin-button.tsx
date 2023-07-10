import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export function Signin() {
  return (
    <div>
      <Button size="sm" onClick={() => signIn()}>
        Sign In
      </Button>
    </div>
  );
}
