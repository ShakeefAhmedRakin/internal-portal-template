import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UsersAdminUserType } from "@/hooks/admin/useUsersAdmin";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import type { User } from "better-auth";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../../../../../components/ui/badge";
import { cn } from "../../../../../lib/utils";

const rowHeight = "h-[58.5px]"; // enforce row height via Tailwind

export default function UserTable({
  users,
  limit,
  user,
  visibleCols,
}: {
  users: UsersAdminUserType[];
  limit: number;
  user: User;
  visibleCols: {
    name: boolean;
    email: boolean;
    role: boolean;
    status: boolean;
    created: boolean;
    actions: boolean;
  };
}) {
  const currentUserId = user.id;

  return (
    <div className="thin-styled-scroll-container h-full flex-1 overflow-x-auto overflow-y-auto rounded-md border">
      <Table className="table-fixed">
        <colgroup>
          {visibleCols.name && <col style={{ width: "200px" }} />}
          {visibleCols.email && <col style={{ width: "200px" }} />}
          {visibleCols.role && <col style={{ width: "100px" }} />}
          {visibleCols.status && <col style={{ width: "100px" }} />}
          {visibleCols.created && <col style={{ width: "200px" }} />}
          {visibleCols.actions && <col style={{ width: "50px" }} />}
        </colgroup>
        <TableHeader className="bg-muted sticky top-0">
          <TableRow className={rowHeight}>
            {visibleCols.name && (
              <TableHead className="text-xs">Name</TableHead>
            )}
            {visibleCols.email && (
              <TableHead className="text-xs">Email</TableHead>
            )}
            {visibleCols.role && (
              <TableHead className="text-xs">Role</TableHead>
            )}
            {visibleCols.status && (
              <TableHead className="text-xs">Status</TableHead>
            )}
            {visibleCols.created && (
              <TableHead className="text-xs">Created</TableHead>
            )}
            {visibleCols.actions && (
              <TableHead className="text-center text-xs">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className={cn("even:bg-muted/50", rowHeight)}>
              {visibleCols.name && (
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex w-fit cursor-default items-center gap-1 truncate text-[11px] md:text-xs">
                          {u.name}{" "}
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
                        <div className="w-fit cursor-default truncate text-[11px] md:text-xs">
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
                    className="text-[10px] font-bold uppercase"
                  >
                    {u.role || "user"}
                  </Badge>
                </TableCell>
              )}
              {visibleCols.status && (
                <TableCell className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      u.banned && "text-destructive"
                    )}
                  >
                    {u.banned ? "Banned" : "Active"}
                  </Badge>
                </TableCell>
              )}
              {visibleCols.created && (
                <TableCell>
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
              )}
              {visibleCols.actions && (
                <TableCell className="flex items-center justify-center">
                  <Button variant="outline" size="icon-sm">
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}

          {Array.from({ length: Math.max(0, limit - users.length) }).map(
            (_, index) => (
              <TableRow
                key={`empty-${index}`}
                className={cn("even:bg-muted/50", rowHeight)}
              >
                {visibleCols.name && (
                  <TableCell>
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.email && (
                  <TableCell>
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.role && (
                  <TableCell>
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.status && (
                  <TableCell className="flex items-center gap-2">
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.created && (
                  <TableCell>
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.actions && (
                  <TableCell className="flex items-center justify-center">
                    <Button variant="outline" size="icon-sm" disabled>
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
