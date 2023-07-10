import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Sort() {
  return (
    <Select defaultValue="members-1">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="members-1">Members high to low</SelectItem>
        <SelectItem value="members-2">Members low to high</SelectItem>
        <SelectItem value="recent">Recently Added</SelectItem>
      </SelectContent>
    </Select>
  );
}
