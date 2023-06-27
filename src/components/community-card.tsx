import { BellRing, Check, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function CommunityCard({
  className,
  community,
  ...props
}: CardProps & {
  community: {
    name: string;
    banner_url: string;
    profile_url: string;
    token?: { symbol: string };
    condition: {
      type: string;
      value?: string | number;
    };
  };
}) {
  return (
    <Card {...props}>
      <CardContent className="grid gap-4">
        <div className="flex relative mt-6">
          <div
            className="overflow-hidden rounded-md border"
            style={{ height: "50px", width: "100%" }}
          >
            <img
              src={community.banner_url}
              className="w-full h-full object-cover"
            />
          </div>
          <img
            src={community.profile_url}
            className="w-14 h-14 rounded-lg absolute top-4 left-2 border"
          />
        </div>

        <div className="mt-4 font-bold">{community.name}</div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {community.condition.type}
            </p>
            <p className="text-sm text-muted-foreground">
              {community.condition.value}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Follow</Button>
        <Button>Join</Button>
      </CardFooter>
    </Card>
  );
}
