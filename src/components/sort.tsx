import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sort() {
  return (
    <Select defaultValue="posts">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="posts">Posts high to low</SelectItem>
        <SelectItem value="engagement">Engagement high to low</SelectItem>
        <SelectItem value="reach">Reach high to low</SelectItem>
        <SelectItem value="recent">Recently Added</SelectItem>
      </SelectContent>
    </Select>
  );
}
