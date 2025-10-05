import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Columns, Filter, Plus, Search } from "lucide-react";

export default function UsersTableTopControls({
  isLoading,
  searchValue,
  setSearchValue,
}: {
  isLoading: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <InputGroup className="w-fit">
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
      <ButtonGroup>
        <Button variant="outline" disabled={isLoading}>
          <Filter className="h-4 w-4" />
          <span className="hidden md:flex">Filters</span>
        </Button>
        <Button variant="outline" disabled={isLoading}>
          <Plus className="h-4 w-4" />
          <span className="hidden md:flex">Add User</span>
        </Button>
        <Button variant="outline" disabled={isLoading}>
          <Columns className="h-4 w-4" />
          <span className="hidden md:flex">Columns</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}
