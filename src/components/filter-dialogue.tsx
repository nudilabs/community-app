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

import { Label } from '@/components/ui/label';
import { Icons } from './icons';
import { motion } from 'framer-motion';

import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import Link from 'next/link';
import { Community } from '@/types/community';

export function FilterDialogue({ community }: { community: Community }) {
  const [searchUrl, setSearchUrl] = useState('');
  const [event, setEvent] = useState('none');
  const [sort, setSort] = useState(false);

  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 1),
  });

  const handleEventChange = (event: string) => {
    setEvent(event);
  };

  const handleDateChange = (event: string) => {
    if (event === 'today') {
      handleToday();
    } else if (event === 'yesterday') {
      handleYesterday();
    } else {
      setDate(undefined);
    }
  };

  const handleSortChange = (event: boolean) => {
    setSort(event);
  };

  const handleToday = () => {
    setDate({
      from: addDays(today, 0),
      to: addDays(today, 1),
    });
  };

  const handleYesterday = () => {
    setDate({
      from: addDays(today, -1),
      to: addDays(today, 0),
    });
  };

  useEffect(() => {
    const selectedEvent = community?.events?.find((e) => e.id === event);

    const hashtags =
      selectedEvent?.hashtags.join('%20').replace('#', '%23') || '';

    const sorted = sort ? '' : '&f=live';

    const since = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
    const until = date?.to ? format(date.to, 'yyyy-MM-dd') : '';
    const dates = selectedEvent
      ? `since%3A${selectedEvent.date.from}%20until%3A${selectedEvent.date.to}`
      : date
      ? `since%3A${since}%20until%3A${until}`
      : '';

    const url = `https://twitter.com/search?q=list%3A${community.list}%20${hashtags}%20-filter%3Aretweets%20${dates}&src=typed_query${sorted}`;
    setSearchUrl(url);
  }, [event, date, sort]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Icons.filter className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{community.name}</DialogTitle>
          <DialogDescription>Advanced Timelines</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          {/* <RadioGroup
            defaultValue={event}
            className="grid grid-cols-3 gap-4"
            onValueChange={handleEventChange}
          >
            <Label
              htmlFor="none"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="none" id="none" className="sr-only" />
              <Icons.none className="mb-3 h-6 w-6" />
              None
            </Label>
            {community.events &&
              community.events.length > 0 &&
              community.events.map((event, index) => (
                <Label
                  htmlFor={event.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  key={index}
                >
                  <RadioGroupItem
                    value={event.id}
                    id={event.id}
                    className="sr-only"
                  />
                  <Icons.event className="mb-3 h-6 w-6" />
                  {event.title}
                </Label>
              ))}
          </RadioGroup>
          <Separator /> */}
          <div className="grid gap-2">
            <Label htmlFor="area">Date</Label>
            {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
            <RadioGroup
              defaultValue="all"
              className="grid grid-cols-3 gap-4"
              onValueChange={handleDateChange}
            >
              <Label
                htmlFor="all"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="all" id="all" className="sr-only" />
                All
              </Label>
              <Label
                htmlFor="today"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="today" id="today" className="sr-only" />
                Today
              </Label>
              <Label
                htmlFor="yesterday"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="yesterday"
                  id="yesterday"
                  className="sr-only"
                />
                Yesterday
              </Label>
            </RadioGroup>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Top Tweets</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Sort by top tweets to see the most relevant tweets first
              </span>
            </Label>
            <Switch id="necessary" onCheckedChange={handleSortChange} />
          </div>
        </div>
        <DialogFooter>
          <Link href={searchUrl} target="_blank" className="w-full">
            <Button className="w-full">Search</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
