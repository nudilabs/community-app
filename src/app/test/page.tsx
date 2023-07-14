'use client';

import { SignInDialogue } from '@/components/sign-in-dialogue';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <SignInDialogue>
        <Button variant="outline">Sign in</Button>
      </SignInDialogue>
    </div>
  );
}
