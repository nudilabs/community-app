import Link from 'next/link';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { communities } from '@/config/communities';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const FeaturedBanner = () => {
  const eventName = '0n1forcesdcc2023';
  const communityName = '0n1force';
  const community = communities.find((c) => c.id === communityName);
  const selectedEvent = community?.events.find((e) => e.id === eventName);

  const hashtags =
    selectedEvent?.hashtags.join('%20').replaceAll('#', '%23') || '';

  const url = `https://twitter.com/search?q=list%3A${community?.list}%20${hashtags}%20%20-filter%3Aretweets%20until%3A${selectedEvent?.date.to}%20since%3A${selectedEvent?.date.from}&src=typed_query&f=live`;
  console.log('cl: ', community?.list);
  console.log('hashtags: ', hashtags);
  const mockUrl = `https://twitter.com/search?q=list%3A1677692164376248321%20%23SDCC2023%20-filter%3Aretweets&src=typed_query&f=live`;

  const buttonVariants = {
    initial: {
      x: 0,
    },
    whileHover: { x: 0 },
  };

  const arrowVariants = {
    initial: {
      x: 0,
    },
    whileHover: {
      x: 5,
    },
  };

  return (
    <div className="flex justify-center items-center p-2 md:p-0 w-full md:w-[400px] fixed bottom-0 right-0 md:bottom-6 md:right-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            <div className="flex p-4 items-center gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400">
                  {selectedEvent?.title}
                </span>
                <h3 className="text-2xl font-semibold">{community?.name}</h3>
              </div>
              <motion.div
                initial="initial"
                whileHover="whileHover"
                variants={buttonVariants}
              >
                <Link href={url} target="_blank">
                  <Button>
                    View
                    <motion.div variants={arrowVariants}>
                      <Icons.arrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};