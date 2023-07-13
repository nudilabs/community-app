import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Icons } from './icons';
import { FilterDialogue } from './filter-dialogue';

import { Community } from '@/types/community';
import { CollectionDialogue } from './collection-dialogue';
import { ConditionCarousel } from './condition-carousel';

import { env } from '@/env.mjs';

type CardProps = React.ComponentProps<typeof Card>;

// async function getHolders(contractAddr: string | undefined) {
//   if (!contractAddr) {
//     return 0;
//   }
//   const res = await fetch(
//     `https://eth-mainnet.g.alchemy.com/nft/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}/getOwnersForCollection?contractAddress=${contractAddr}&withTokenBalances=false`
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//   const data = await res.json();
//   return data.ownerAddresses.length;
// }

// async function getFloorData(contractAddr: string | undefined) {
//   if (!contractAddr) {
//     return 0;
//   }
//   const res = await fetch(
//     `https://eth-mainnet.g.alchemy.com/nft/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}/getFloorPrice?contractAddress=${contractAddr}`
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//   const data = await res.json();
//   console.log('data: ', data);
//   return data;
// }

export async function CommunityCard({
  className,
  community,
  children,
  ...props
}: CardProps & {
  community: Community;
  children?: React.ReactNode;
}) {
  // const [floorPrice, holders] = await Promise.all([
  //   getFloorData(community.contractAddr),
  //   getHolders(community.contractAddr),
  // ]);

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
            <div className="flex items-center text-sm">
              <Icons.user className="mr-1 h-4 w-4" />
              6.9k
            </div>
          </div>
        </div>
        <ConditionCarousel community={community} />
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <div className="gap-2 flex">
          {children}
          {/* <CollectionDialogue
            community={community}
            floorPrice={floorPrice}
            holders={holders}
          >
            <Button>View</Button>
          </CollectionDialogue> */}
        </div>
        <FilterDialogue community={community} />
      </CardFooter>
    </Card>
  );
}
