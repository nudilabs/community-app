import { Icons } from './icons';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <div className="flex py-6 px-8 lg:px-40 justify-between flex-col md:flex-row items-center text-center gap-4">
      <div className="text-sm">
        Copyright © 2023. 3MPOWER. All rights reserved.
      </div>
      <div className="flex gap-1 items-center">
        <Button variant="ghost" size="icon">
          <Icons.twitter className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.discord className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
