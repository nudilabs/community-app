import { BellRing, Check, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from './icons';
import { FilterDialogue } from './filter-dialogue';
import { Community } from '@/types/community';
import { CollectionDialogue } from './collection-dialogue';

type CardProps = React.ComponentProps<typeof Card>;

export function CommunityCard({
  className,
  community,
  ...props
}: CardProps & {
  community: Community;
}) {
  return (
    <Card {...props}>
      <CardContent className="grid gap-4">
        <div className="flex relative mt-6">
          <div
            className="overflow-hidden rounded-md border"
            style={{ height: '50px', width: '100%' }}
          >
            <img
              src={community.banner_url}
              className="w-full h-full object-cover"
              alt={community.name}
            />
          </div>
          <img
            src={community.profile_url}
            className="w-14 h-14 rounded-lg absolute top-4 left-2 border"
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold">{community.name}</div>
          <div className="flex gap-2">
            <div className="flex items-center text-xs">
              <Icons.user className="mr-1 h-3 w-3" />
              1k
            </div>
            <div className="flex items-center text-xs">
              <Icons.eth className="mr-1 h-3 w-3" />
              1.14
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {community.condition.type}
            </p>
            <p className="text-sm text-muted-foreground">
              {community.condition.value}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <div className="gap-2 flex">
          <CollectionDialogue community={community} />
        </div>
        <FilterDialogue community={community} />
      </CardFooter>
    </Card>
  );
}
