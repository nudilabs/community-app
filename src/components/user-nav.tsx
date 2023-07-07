import {
  CreditCard,
  LogOut,
  PlusCircle,
  Settings,
  User,
  Wallet,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { VerifyWalletsDialogue } from "./verify-wallets-dialogue";
import { useState } from "react";

export function UserNav() {
  const router = useRouter();
  const [verifyWalletsOpen, setVerifyWalletsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://pbs.twimg.com/profile_images/1664246945282674688/5npajd8q_400x400.jpg"
                alt="@shadcn"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">ayvee 🐌</p>
              <p className="text-xs leading-none text-muted-foreground">
                @ayvee_dev
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setVerifyWalletsOpen(true)}>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Verify Wallets</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <VerifyWalletsDialogue
        open={verifyWalletsOpen}
        setOpen={setVerifyWalletsOpen}
      />
    </>
  );
}
