import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ height: "calc(100vh - 104px)" }}
    >
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-center max-w-xs md:max-w-none mx-auto">
          Empower your community
        </h1>
        <p className="text-sm text-center text-gray-500 mt-4 max-w-xs md:max-w-xl mx-auto">
          Connect, engage, and grow your community with Rise CRM, the modern
          community relationship management platform for creators.
        </p>
        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="outline"
            className="bg-gradient-to-br from-purple-500 to-cyan-500"
          >
            Empower
          </Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </div>
  );
}
