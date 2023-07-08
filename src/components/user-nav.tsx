import { CreditCard, LogOut, PlusCircle, Settings, User, Wallet, RefreshCcw } from "lucide-react";

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
import { VerifyWalletsDialogue } from "./verify-wallets-dialogue";
import { useState } from "react";
import { useSession, useUser } from "@clerk/clerk-react";
// import { ConnectButton } from "./connect-button";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";
import { truncatedAddr } from "@/lib/utils";

export function UserNav() {
  const [verifyWalletsOpen, setVerifyWalletsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { openProfile } = useModal({
    onConnect: () => {
      setVerifyWalletsOpen(true);
    },
  });
  const { isLoaded, session } = useSession();
  const { isSignedIn, user } = useUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user?.imageUrl} alt={`@${user?.username}`} />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              {/* <p className='text-sm font-medium leading-none'>{user?.fullName}</p> */}
              <p className='text-sm font-normal leading-none'>@{user?.username}</p>
              {/* <p className='text-[11px] leading-none text-muted-foreground'>{address}</p> */}
              {isConnected && (
                <p className='text-[11px] leading-none text-muted-foreground'>
                  {truncatedAddr(String(address))}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openProfile}>
              {isConnected ? (
                <>
                  <RefreshCcw className='mr-2 h-4 w-4' />
                  <span>Switch Wallet</span>
                </>
              ) : (
                <>
                  <Wallet className='mr-2 h-4 w-4' />
                  <span>Verify Wallet</span>
                </>
              )}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <ConnectButton />
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => session?.end()}>
            <LogOut className='mr-2 h-4 w-4 text-red-500' />
            <span className='text-red-500'>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <VerifyWalletsDialogue open={verifyWalletsOpen} setOpen={setVerifyWalletsOpen} />
    </>
  );
}
