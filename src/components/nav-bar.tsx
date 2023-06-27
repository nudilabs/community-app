"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserNav } from "./user-nav";
import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems: { title: string; href: string }[] = [
  {
    title: "Communities",
    href: "/community",
  },
  {
    title: "Quests",
    href: "/quest",
  },
];

export default function NavBar() {
  const pathName = usePathname();
  const isPathActive = (url: string) => {
    return pathName === url;
  };
  return (
    <div className="py-8 px-8 lg:px-40 flex items-center">
      <div className="flex gap-2 items-center w-full">
        <Icons.logo className="h-8 w-8" />
        <Link href={"/"}>
          <div className="gap-1 flex">
            <span className="font-extrabold">RISE</span>
          </div>
        </Link>
        <Badge>Beta</Badge>
      </div>
      <div className="w-full flex justify-center hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isPathActive(item.href)}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-full flex justify-end gap-4 items-center">
        <MobileNav />
        <Link href={"/contact"} legacyBehavior passHref>
          <span className="font-medium cursor-pointer text-sm hidden lg:block">
            Contact
          </span>
        </Link>
        <UserNav />
      </div>
    </div>
  );
}

const MobileNav = () => {
  const router = useRouter();
  const handleMobileClick = () => {
    router.push("/community");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 items-center w-full">
              <Icons.logo className="h-8 w-8" />
              <Link href={"/"}>
                <div className="gap-1 flex">
                  <span className="font-extrabold">RISE</span>
                  <span>CRM</span>
                </div>
              </Link>
              <Badge>Beta</Badge>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={handleMobileClick}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
