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

import { Community } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';

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
            <div className="flex absolute top-16 right-2 gap-2">
              <Card>
                <div className="px-4 py-2 flex flex-col">
                  <div className="flex items-center">
                    <Icons.user className="mr-1 h-3 w-3" />
                    2k
                  </div>
                  <div className="text-xs text-gray-500">Members</div>
                </div>
              </Card>
              <Card>
                <div className="px-4 py-2 flex flex-col">
                  <div className="flex items-center">
                    <Icons.holder className="mr-1 h-3 w-3" />
                    3k
                  </div>
                  <div className="text-xs text-gray-500">Holders</div>
                </div>
              </Card>
              <Card>
                <div className="px-4 py-2 flex flex-col">
                  <div className="flex items-center">
                    <Icons.eth className="mr-1 h-3 w-3" />
                    1.14
                  </div>
                  <div className="text-xs text-gray-500">Floor</div>
                </div>
              </Card>
            </div>
          </div>
          <DialogTitle className="text-left">{community.name}</DialogTitle>
          <DialogDescription className="text-left">
            Join this token-gated list to empower the community.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8 justify-between">
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
            <TabsContent value="members" className="h-[240px] overflow-scroll">
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
                        size="xs"
                        variant="outline"
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
            <TabsContent
              value="events"
              className="min-h-[240px] overflow-scroll"
            >
              <div className="grid grid-cols-2 gap-4">
                {community.events.map((event, index) => (
                  <div className="col-span-2" key={index}>
                    <Card className="w-full bg-gradient-to-b from-slate-950 to-slate-900 border-slate-900 rounded-lg overflow-hidden">
                      <div className="flex gap-2">
                        <div>
                          <Image
                            src="https://i.imgur.com/8IZw7Md.png"
                            width={110}
                            height={110}
                            alt="0n1force"
                          />
                        </div>
                        <div className="flex p-4 items-center gap-4 justify-between w-full">
                          <div className="flex flex-col gap-2">
                            <span className="text-xs text-gray-400">
                              {`${event.date.from} - ${event.date.to}`}
                            </span>
                            <h3 className="text-2xl font-semibold">
                              {event.title}
                            </h3>
                          </div>

                          <Link href="" target="_blank">
                            <Button>
                              View
                              <Icons.arrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline">Follow</Button>
            <Button className="w-full">Join</Button>
          </div>
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
