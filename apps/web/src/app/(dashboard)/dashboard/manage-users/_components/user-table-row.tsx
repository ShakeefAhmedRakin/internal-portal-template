import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UsersAdminUserType } from "@/hooks/admin/useUsersAdmin";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import { Badge } from "../../../../../components/ui/badge";
import { cn } from "../../../../../lib/utils";
import UserTableActionsDialog from "./user-table-actions-dialog";
import UserTableDeleteDialog from "./user-table-delete-dialog";

const rowHeight = "h-[63.5px]";

export default function UserTableRow({
  user: u,
  currentUserId,
  visibleCols,
  refetch,
}: {
  user: UsersAdminUserType;
  currentUserId: string;
  visibleCols: {
    name: boolean;
    email: boolean;
    role: boolean;
    status: boolean;
    created: boolean;
    updated: boolean;
    actions: boolean;
  };
  refetch: () => void;
}) {
  return (
    <TableRow
      key={u.id}
      className={cn("even:bg-accent dark:even:bg-muted/20", rowHeight)}
    >
      {visibleCols.name && (
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex max-w-fit cursor-default items-center gap-1 text-[11px] md:text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="truncate">{u.name}</span>
                    <span className="text-muted-foreground line-clamp-1 max-w-24 truncate text-[9px]">
                      {u.id}
                    </span>
                  </div>
                  {u.id === currentUserId && (
                    <Badge
                      variant="default"
                      className="text-[8px] font-bold uppercase"
                    >
                      You
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{u.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      {visibleCols.email && (
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="line-clamp-1 max-w-fit cursor-default text-[11px] break-all md:text-xs">
                  {u.email}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{u.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      {visibleCols.role && (
        <TableCell>
          <Badge
            variant={
              u.role === USER_ROLES.ADMIN
                ? "destructive"
                : u.role === USER_ROLES.OPERATOR
                  ? "default"
                  : "outline"
            }
            className="text-[8px] font-bold uppercase xl:text-[10px]"
          >
            {u.role || "user"}
          </Badge>
        </TableCell>
      )}
      {visibleCols.status && (
        <TableCell>
          {u.banned ? (
            <span className="text-destructive dark:text-destructive/60 text-[9px] whitespace-normal md:text-xs xl:text-[10px]">
              Banned{" "}
              {u.banExpires
                ? "Till " +
                  new Date(u.banExpires).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })
                : "Permanently"}
            </span>
          ) : (
            <Badge
              variant="outline"
              className={"text-[8px] font-bold uppercase xl:text-[10px]"}
            >
              Active
            </Badge>
          )}
        </TableCell>
      )}
      {visibleCols.created && (
        <TableCell className="text-[9px] whitespace-normal md:text-xs xl:text-[10px]">
          {new Date(u.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </TableCell>
      )}
      {visibleCols.updated && (
        <TableCell className="text-[9px] whitespace-normal md:text-xs xl:text-[10px]">
          {new Date(u.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </TableCell>
      )}
      {visibleCols.actions && (
        <TableCell className="flex items-center justify-end gap-1">
          <UserTableActionsDialog />
          <UserTableDeleteDialog user={u} refetch={refetch} />
        </TableCell>
      )}
    </TableRow>
  );
}
