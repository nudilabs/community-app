import { CommunityCard } from "@/components/community-card";
import { Search } from "@/components/search";
import Sort from "@/components/sort";

const communities = [
  {
    name: "Mazk Gang",
    banner_url:
      "https://i.seadn.io/gcs/files/cdecc2857d452866eeebc87d96a7e33d.jpg?auto=format&dpr=1&w=1920",
    profile_url:
      "https://i.seadn.io/gcs/files/9a3eca819213540351ae773d384d4383.gif?auto=format&dpr=1&w=256",
    condition: {
      type: "Token Gated",
      value: "Hold at least 1 token",
    },
  },
  {
    name: "0N1 Force",
    banner_url:
      "https://i.seadn.io/gcs/files/7c09241857d176d479e2fdab337d4304.png?auto=format&dpr=1&w=1920",
    profile_url:
      "https://i.seadn.io/gae/7gOej3SUvqALR-qkqL_ApAt97SpUKQOZQe88p8jPjeiDDcqITesbAdsLcWlsIg8oh7SRrTpUPfPlm12lb4xDahgP2h32pQQYCsuOM_s?auto=format&dpr=1&w=256",
    token: { symbol: "0N1" },
    condition: {
      type: "Token Gated",
      value: "Hold at least 1 token",
    },
  },
  {
    name: "y00ts",
    banner_url:
      "https://i.seadn.io/gcs/files/3765ea435fd0e561c59b3fa50e51c8b7.png?auto=format&dpr=1&w=1920",
    profile_url:
      "https://i.seadn.io/gcs/files/ce85ffa4aab75e4024e70f18160bbf9f.png?auto=format&dpr=1&w=256",
    token: { symbol: "y00ts" },
    condition: {
      type: "Token Gated",
      value: "Hold at least 1 token",
    },
  },
  {
    name: "Wale Hub",
    banner_url:
      "https://pbs.twimg.com/profile_banners/1501997405755088900/1676400930/1500x500",
    profile_url:
      "https://pbs.twimg.com/profile_images/1625195287231832065/uXeu4ljd_400x400.jpg",
    condition: {
      type: "Discord Gated",
      value: "Be member of discord",
    },
  },
  {
    name: "Other Guild",
    banner_url:
      "https://pbs.twimg.com/profile_banners/1521585633445122048/1653085201/600x200",
    profile_url:
      "https://pbs.twimg.com/profile_images/1527685328835858433/vIKgyrun_400x400.jpg",
    condition: {
      type: "Token Gated",
      value: "Hold at least 1 token",
    },
  },
  {
    name: "Gangster All Star",
    banner_url:
      "https://i.seadn.io/gcs/files/d87a1701a53d2c6ea1436a75c0a5e8bb.png?auto=format&dpr=1&w=1920",
    profile_url:
      "https://i.seadn.io/gcs/files/640e4a327df090f03560e6ff7ed47c94.png?auto=format&dpr=1&w=256",
    condition: {
      type: "Token Gated",
      value: "Hold at least 1 token",
    },
  },
  {
    name: "OTHERspace",
    banner_url:
      "https://pbs.twimg.com/profile_banners/1520693714225549312/1681327352/600x200",
    profile_url:
      "https://pbs.twimg.com/profile_images/1671372965617991682/klZfvbEg_400x400.jpg",
    condition: {
      type: "Discord Gated",
      value: "Be member of discord",
    },
  },
];
export default function Community() {
  return (
    <div className="min-w:h-screen flex flex-col lg:px-40 px-8 py-4 gap-24">
      <div className="flex flex-col">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl md:text-3xl font-extrabold">Communities</h1>
            <p className="text-gray-400">{communities.length}</p>
          </div>
          <div className="flex gap-2">
            <div className="hidden md:block">
              <Sort />
            </div>
            <div className="w-full md:w-auto">
              <Search />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-8">
          {communities.map((community, index) => (
            <div className="col-span-12 lg:col-span-3" key={index}>
              <CommunityCard community={community} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
