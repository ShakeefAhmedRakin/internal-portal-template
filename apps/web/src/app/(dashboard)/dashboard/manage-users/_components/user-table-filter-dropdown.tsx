import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import { Filter } from "lucide-react";
import { Checkbox } from "../../../../../components/ui/checkbox";

export default function UserTableFilterDropdown({
  isLoading,
  filteredField,
  setFilteredField,
  filteredValue,
  setFilteredValue,
}: {
  isLoading: boolean;
  filteredField: "role" | "banned" | undefined;
  setFilteredField: (value: "role" | "banned" | undefined) => void;
  filteredValue: string | boolean | undefined;
  setFilteredValue: (value: string | boolean | undefined) => void;
}) {
  const handleFilterChange = (
    field: "role" | "banned" | undefined,
    value: string | boolean | undefined
  ) => {
    if (field === filteredField && value === filteredValue) {
      setFilteredField(undefined);
      setFilteredValue(undefined);
    } else {
      setFilteredField(field);
      setFilteredValue(value);
    }
  };

  const isFilterActive = (
    field: "role" | "banned" | undefined,
    value: string | boolean | undefined
  ) => {
    return filteredField === field && filteredValue === value;
  };

  const renderMenuRow = (field: "role" | "banned", value: string | boolean) => (
    <div className="flex w-full items-center gap-2">
      <Checkbox checked={isFilterActive(field, value)} />
      <span className="capitalize">
        {field === "role" ? value : value ? "Banned" : "Active"}
      </span>
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          <Filter className="h-4 w-4" />
          <span className="hidden md:flex">Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => handleFilterChange("role", USER_ROLES.ADMIN)}
        >
          {renderMenuRow("role", USER_ROLES.ADMIN)}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleFilterChange("role", USER_ROLES.OPERATOR)}
        >
          {renderMenuRow("role", USER_ROLES.OPERATOR)}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleFilterChange("role", USER_ROLES.VISITOR)}
        >
          {renderMenuRow("role", USER_ROLES.VISITOR)}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleFilterChange("banned", true)}>
          {renderMenuRow("banned", true)}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleFilterChange("banned", false)}>
          {renderMenuRow("banned", false)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
