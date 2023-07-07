import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function Signin() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/sign-in");
  };
  return (
    <div>
      <Button size="sm" onClick={handleClick}>
        Sign In
      </Button>
    </div>
  );
}
