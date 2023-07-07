import { Button } from "./ui/button";

const handleClick = () => {
  console.log("test");
};

export function Signin() {
  return (
    <div>
      <Button size='sm' onClick={handleClick}>
        Sign In
      </Button>
    </div>
  );
}
