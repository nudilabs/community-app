"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

import { useSignMessage } from "wagmi";
import { useAccount } from "wagmi";
import { useUser } from "@clerk/nextjs";

export function VerifyWalletsDialogue({
  open,
  setOpen,
  setBindWallet,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setBindWallet: (bindWallet: string) => void;
}) {
  const { user } = useUser();
  const { address } = useAccount();
  const twitterAcc = user?.externalAccounts.find((acc) => acc.provider === "twitter");
  const { signMessage } = useSignMessage({
    message: `Binding wallet with ID: ${twitterAcc?.providerUserId}`,
    onSuccess: async (data) => {
      // console.log("Signed message: ", data);
      const res = await fetch(`/api/binding/twitter`, {
        method: "POST",
        body: JSON.stringify({ signature: data }),
        headers: { "Content-Type": "application/json" },
      });
      const { bindWallet } = await res.json();
      setBindWallet(bindWallet);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[440px]'>
        <DialogHeader>
          <DialogTitle>Verify Wallets</DialogTitle>
          <DialogDescription>
            Connect your wallets that you would like to use to access the token gated lists with.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          {/* <TableDemo /> */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='area'>Your Wallet</Label>
            {/* <Button className="w-full">Connect Wallet</Button> */}
            <div className='w-full'>
              {/* <ConnectKitButton /> */}
              <Button className='w-full' variant='outline' disabled>
                <p className='text-sm font-normal leading-none'>{address} </p>
              </Button>
              {/* <ConnectButton /> */}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Button variant='default' className='w-full' onClick={() => signMessage()}>
              Sign message
            </Button>
          </div>
        </div>
        {/* {isError && <div>Error signing message</div>}
        {isSuccess && <div>Signature: {data}</div>} */}
      </DialogContent>
    </Dialog>
  );
}

// const walletsData = [
//   {
//     address: "0x29Ca6B793498007876Fb68D0f044797f1C395283",
//   },
// ];
