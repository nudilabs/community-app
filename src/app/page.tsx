"use client";

import { CommunityCard } from "@/components/community-card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import Spline from "@splinetool/react-spline";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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

export default function Home() {
  return (
    <>
      <div
        className="h-screen flex justify-center items-center grid grid-cols-12 gap-4 md:px-40 px-8"
        style={{ height: "calc(100vh - 104px)" }}
      >
        <div className="relative z-20 col-span-12 lg:col-span-6">
          <div className="flex gap-4 items-center mb-4 md:justify-center lg:justify-normal">
            <motion.div
              initial={{ opacity: 0, y: -25, x: 100 }} // Initial animation properties
              whileInView={{ opacity: 1, x: 0, y: 0 }} // Animation properties to animate to
              transition={{ duration: 1, delay: 0.25 }}
            >
              <img
                src={communities[0].profile_url}
                className="w-12 h-12 rounded-lg top-4 left-2 border"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50, x: 100 }} // Initial animation properties
              whileInView={{ opacity: 1, x: 0, y: 0 }} // Animation properties to animate to
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src={communities[1].profile_url}
                className="w-12 h-12 rounded-lg top-4 left-2 border"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -75, x: 100 }} // Initial animation properties
              whileInView={{ opacity: 1, x: 0, y: 0 }} // Animation properties to animate to
              transition={{ duration: 1, delay: 0.75 }}
            >
              <img
                src={communities[2].profile_url}
                className="w-12 h-12 rounded-lg top-4 left-2 border"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }} // Initial animation properties
              whileInView={{ opacity: 1, x: [100, -10, 0] }} // Animation properties to animate to
              transition={{ duration: 1, delay: 1.25 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icons.arrowLeft /> Featured
              </div>
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold md:text-center lg:text-left">
            EMPOWER YOUR COMMUNITY
          </h1>
          <p className="text-sm md:text-center lg:text-left text-gray-500 mt-4">
            Connect, engage, and grow your community with Rise, the modern
            community relationship management platform for creators.
          </p>
          <div className="flex justify-center lg:justify-normal mt-8 gap-4">
            <Button className="bg-gradient-to-br from-purple-500 to-cyan-500">
              Explore
            </Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 h-full hidden lg:flex">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 0, x: 0 }} // Initial animation properties
            whileInView={{ opacity: 1 }} // Animation properties to animate to
            transition={{ duration: 1, delay: 0.25 }}
          >
            <Spline scene="https://prod.spline.design/osglOdF65YXc2rZm/scene.splinecode" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.5 },
            }}
          >
            <Icons.chevronsDown className="w-8 h-8 text-gray-500 absolute bottom-4" />
          </motion.div>
        </div>
      </div>
      <div className="min-w:h-screen flex flex-col lg:px-40 px-8 py-4 gap-24">
        <div className="flex flex-col">
          <div className="w-full flex justify-between">
            <h1 className="text-xl md:text-3xl font-extrabold">
              Top Communities
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-8">
            {communities.slice(0, 4).map((community, index) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-3"
                key={index}
              >
                <CommunityCard community={community} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full flex flex-col text-center gap-4">
            <h1 className="md:text-3xl text-2xl font-extrabold bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Connect
            </h1>
            <h1 className="md:text-6xl text-4xl font-extrabold">
              Building Deeper Connections
            </h1>
            <p className="text-md text-center text-gray-500 max-w-screen-sm mx-auto">
              Foster meaningful connections with your community through curated
              Twitter lists and interactive initiatives. Enhance engagement,
              nurture relationships, and create a thriving community ecosystem
              that fosters collaboration, support, and growth.
            </p>
          </div>
          <div className="w-full grid grid-cols-12 gap-4 mt-24">
            <div className="col-span-12 lg:col-span-6 gap-8 flex flex-col">
              <div>
                <div className="p-2 bg-gray-800 inline-block rounded-lg">
                  <Icons.add />
                </div>
                <h1 className="text-2xl font-bold">
                  Experience Token-Gated Curated Twitter Lists
                </h1>
                <p className="text-md text-gray-500 mt-4">
                  Discover and stay connected with your beloved communities on
                  Twitter through our innovative token-gated lists. Immerse
                  yourself in the platform you love while seamlessly exploring
                  curated content and fostering meaningful connections.
                </p>
              </div>
              <div>
                <div className="p-2 bg-gray-800 inline-block rounded-lg">
                  <Icons.community />
                </div>
                <h1 className="text-2xl font-bold">
                  Seamlessly Engage with Your Community on Twitter
                </h1>
                <p className="text-md text-gray-500 mt-4">
                  Interact effortlessly with your community directly on Twitter
                  using our token-gated lists. Leave the worry of identifying
                  real holders to us as we ensure authenticity. Explore curated
                  timelines effortlessly, scrolling through carefully selected
                  content that resonates with your interests.
                </p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 hidden lg:inline-block">
              <motion.div
                initial={{ opacity: 0, y: 0, x: 0 }} // Initial animation properties
                whileInView={{ opacity: 1, x: 70, rotateZ: 5, scale: 1.25 }} // Animation properties to animate to
                transition={{ duration: 1, delay: 0.25 }}
              >
                <img
                  src="/landing/create-list.png"
                  className="w-1/2 border rounded-xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -150, x: 200 }} // Initial animation properties
                whileInView={{ opacity: 1, rotateZ: -5, scale: 1.25 }} // Animation properties to animate to
                transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
              >
                <img
                  src="/landing/list.png"
                  className="w-1/2 border rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
