'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from './icons';

import { Separator } from './ui/separator';
import Link from 'next/link';
import { Community } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';

export function CollectionDialogue({ community }: { community: Community }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex relative mb-8">
            <div
              className="overflow-hidden rounded-md border"
              style={{ height: '100px', width: '100%' }}
            >
              <img
                src={community.banner_url}
                className="w-full h-full object-cover"
                alt={community.name}
              />
            </div>
            <img
              src={community.profile_url}
              className="w-16 h-16 rounded-lg absolute top-16 left-2 border"
            />
          </div>
          <DialogTitle>{community.name}</DialogTitle>
          <DialogDescription>Token-gated list</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members" className="gap-2 items-center">
                  <Icons.community className="w-4 h-4" />
                  Members
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2 items-center">
                  <Icons.event className="w-4 h-4" />
                  Events
                </TabsTrigger>
              </TabsList>
              <TabsContent value="members">
                <div className="grid grid-cols-2 gap-4">
                  {membersMock.map((member, index) => (
                    <div
                      className="flex col-span-2 lg:col-span-1 gap-2 items-center justify-between"
                      key={index}
                    >
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="ghost"
                          className="relative h-10 w-10 rounded-full"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={member.avatar}
                              alt={`@${member.username}`}
                            />
                            <AvatarFallback>RS</AvatarFallback>
                          </Avatar>
                        </Button>
                        <div className="flex flex-col">
                          <div>{member.name}</div>
                          <div className="text-sm text-gray-500">
                            @{member.username}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Button
                          size="sm"
                          className="rounded-full"
                          onClick={() => {
                            const width = 600;
                            const height = 600;
                            const left = window.screen.width / 2 - width / 2;
                            const top = window.screen.height / 2 - height / 2;
                            const options = `location,status,scrollbars,resizable,width=${width},height=${height},left=${left},top=${top}`;

                            window.open(
                              `https://twitter.com/intent/follow?screen_name=${member.username}`,
                              'Popup',
                              options
                            );
                          }}
                        >
                          Follow
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="events">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Card>
                      <CardHeader className="flex">
                        <div>
                          <div>Test</div>
                          <div>Test</div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const membersMock = [
  {
    username: 'auksorn_',
    name: 'auksorn 👹',
    avatar:
      'https://pbs.twimg.com/profile_images/1573243420667060225/6eVWkn7r_400x400.jpg',
  },
  {
    username: 'auksorn_',
    name: 'auksorn 👹',
    avatar:
      'https://pbs.twimg.com/profile_images/1573243420667060225/6eVWkn7r_400x400.jpg',
  },
  {
    username: 'auksorn_',
    name: 'auksorn 👹',
    avatar:
      'https://pbs.twimg.com/profile_images/1573243420667060225/6eVWkn7r_400x400.jpg',
  },
];
