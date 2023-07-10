import { LogOut, Link2Off, Link2, Wallet, RefreshCcw } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VerifyWalletsDialogue } from './verify-wallets-dialogue';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';
import { truncatedAddr } from '@/lib/utils';

export function UserNav() {
  const [verifyWalletsOpen, setVerifyWalletsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { openProfile } = useModal({
    onConnect: () => {
      setVerifyWalletsOpen(true);
    },
  });
  const { data: session } = useSession();
  // const { session } = useSession();
  // const { isLoaded, user } = useUser();

  const [bindWallet, setBindWallet] = useState('');

  useEffect(() => {
    // console.log("user", user?.publicMetadata.bindWallet);
    if (isLoaded) {
      setBindWallet(user?.publicMetadata.bindWallet as string);
    }
  }, [isLoaded]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt={`@${user?.username}`} />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {/* <p className='text-sm font-medium leading-none'>{user?.fullName}</p> */}
              <p className="text-sm font-normal leading-none">
                @{user?.username}
              </p>
              {/* <p className='text-[11px] leading-none text-muted-foreground'>{address}</p> */}
              {isConnected && (
                <div className="flex flex-row items-center">
                  <p className="text-[11px] leading-none text-muted-foreground">
                    {truncatedAddr(String(address))}
                  </p>
                  {bindWallet === String(address) ? (
                    <Link2 className="ml-1 h-3 w-3" color="#94949c" />
                  ) : (
                    <Link2Off
                      className="ml-1 h-3 w-3 text-red-400"
                      onClick={() => {
                        setVerifyWalletsOpen(true);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openProfile}>
              {isConnected ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  <span>Switch Wallet</span>
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
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
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <VerifyWalletsDialogue
        open={verifyWalletsOpen}
        setOpen={setVerifyWalletsOpen}
        setBindWallet={setBindWallet}
      />
    </>
  );
}
