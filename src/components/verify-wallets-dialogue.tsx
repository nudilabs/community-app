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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { user } = useUser();
  const { address } = useAccount();
  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: `Binding wallet with ID: ${user?.externalAccounts[0].providerUserId}`,
  });

  const handleSignMessage = async () => {
    await signMessage();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Verify Wallets</DialogTitle>
          <DialogDescription>
            Connect your wallets that you would like to use to access the token
            gated lists with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Your Wallet</Label>

            <div className="w-full">
              <Button className="w-full" variant="outline" disabled>
                <p className="text-sm font-normal leading-none">{address} </p>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="w-full"
              onClick={handleSignMessage}
            >
              Sign message
            </Button>
          </div>
        </div>
        {isError && <div>Error signing message</div>}
        {isSuccess && <div className="overflow-scroll">Signature: {data}</div>}
      </DialogContent>
    </Dialog>
  );
}

// const walletsData = [
//   {
//     address: "0x29Ca6B793498007876Fb68D0f044797f1C395283",
//   },
// ];
