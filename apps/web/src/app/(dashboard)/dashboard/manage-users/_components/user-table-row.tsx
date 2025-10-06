import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UsersAdminUserType } from "@/hooks/admin/useUsersAdmin";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import { MoreVertical } from "lucide-react";
import { Badge } from "../../../../../components/ui/badge";
import { cn } from "../../../../../lib/utils";

const rowHeight = "h-[63.5px]";

export default function UserTableRow({
  user: u,
  currentUserId,
  visibleCols,
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
}) {
  return (
    <TableRow key={u.id} className={cn("even:bg-muted/50", rowHeight)}>
      {visibleCols.name && (
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex max-w-fit cursor-default items-center gap-1 text-[11px] md:text-xs">
                  <span className="truncate">{u.name}</span>
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
                <p>{u.name}</p>
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
          <Badge
            variant="outline"
            className={cn(
              "text-[8px] font-bold uppercase xl:text-[10px]",
              u.banned && "text-destructive"
            )}
          >
            {u.banned ? "Banned" : "Active"}
          </Badge>
        </TableCell>
      )}
      {visibleCols.created && (
        <TableCell className="text-[11px] whitespace-normal md:text-xs">
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
        <TableCell className="text-[11px] whitespace-normal md:text-xs">
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
        <TableCell className="flex items-center justify-end">
          <Button variant="outline" size="icon-sm" className="mt-2">
            <MoreVertical className="size-4.5" />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
