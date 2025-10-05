import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Spinner } from "../../../../../components/ui/spinner";
import { cn } from "../../../../../lib/utils";
import UserTableColumnsDropdown from "./user-table-columns-dropdown";
import UserTableFilterDropdown from "./user-table-filter-dropdown";

export default function UsersTableTopControls({
  isLoading,
  searchValue,
  setSearchValue,
  filteredField,
  setFilteredField,
  filteredValue,
  setFilteredValue,
  visibleCols,
  setVisibleCols,
}: {
  isLoading: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  filteredField: "role" | "banned" | undefined;
  setFilteredField: (value: "role" | "banned" | undefined) => void;
  filteredValue: string | boolean | undefined;
  setFilteredValue: (value: string | boolean | undefined) => void;
  visibleCols: {
    name: boolean;
    email: boolean;
    role: boolean;
    status: boolean;
    created: boolean;
    actions: boolean;
  };
  setVisibleCols: (v: {
    name: boolean;
    email: boolean;
    role: boolean;
    status: boolean;
    created: boolean;
    actions: boolean;
  }) => void;
}) {
  const [localValue, setLocalValue] = useState(searchValue);
  const debounceMs = 300;

  // keep local input in sync when external value changes (e.g., reset)
  useEffect(() => {
    setLocalValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (localValue !== searchValue) {
        setSearchValue(localValue);
      }
    }, debounceMs);
    return () => clearTimeout(id);
  }, [localValue]);

  return (
    <div className="flex items-center justify-between gap-x-2">
      <InputGroup className="w-fit">
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />

        <InputGroupAddon align="inline-end">
          <Spinner className={cn(isLoading ? "opacity-100" : "opacity-0")} />
        </InputGroupAddon>
      </InputGroup>
      <ButtonGroup>
        <Button variant="outline" disabled={isLoading}>
          <Plus className="h-4 w-4" />
          <span className="hidden md:flex">Add User</span>
        </Button>
        <UserTableColumnsDropdown
          isLoading={isLoading}
          visibleCols={visibleCols}
          setVisibleCols={setVisibleCols}
        />
        <UserTableFilterDropdown
          isLoading={isLoading}
          filteredField={filteredField}
          setFilteredField={setFilteredField}
          filteredValue={filteredValue}
          setFilteredValue={setFilteredValue}
        />
      </ButtonGroup>
    </div>
  );
}
