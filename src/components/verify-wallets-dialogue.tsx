"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncatedAddr } from "@/lib/utils";

export function VerifyWalletsDialogue({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Wallets</DialogTitle>
          <DialogDescription>
            Connect your wallets that you would like to use to access the token
            gated lists with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <TableDemo />
          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Step 1.</Label>
            <Button className="w-full">Connect Wallet</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Step 2.</Label>
            <Button variant="outline" className="w-full" disabled>
              Sign message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const wallets = [
  {
    address: "0x29Ca6B793498007876Fb68D0f044797f1C395283",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your bound wallets</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wallets.map((wallet) => (
          <TableRow key={wallet.address}>
            <TableCell className="font-medium">
              {truncatedAddr(wallet.address)}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
