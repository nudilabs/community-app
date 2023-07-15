'use client';

import { SignInDialogue } from '@/components/sign-in-dialogue';
import Stepper from '@/components/stepper';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <Stepper />
    </div>
  );
}
