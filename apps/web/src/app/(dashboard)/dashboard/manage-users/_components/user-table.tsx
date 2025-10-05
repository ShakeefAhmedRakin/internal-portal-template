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

const cellHeight = 58.5;

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
          <TableRow>
            {visibleCols.name && <TableHead>Name</TableHead>}
            {visibleCols.email && <TableHead>Email</TableHead>}
            {visibleCols.role && <TableHead>Role</TableHead>}
            {visibleCols.status && <TableHead>Status</TableHead>}
            {visibleCols.created && <TableHead>Created</TableHead>}
            {visibleCols.actions && (
              <TableHead>
                <span className="ml-5.5">Actions</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow className="even:bg-muted/50" key={user.id}>
              {visibleCols.name && (
                <TableCell
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex w-fit cursor-default items-center gap-1 truncate text-[11px] md:text-xs">
                          {user.name}{" "}
                          {user.id === currentUserId && (
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
                        <p>{user.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              )}
              {visibleCols.email && (
                <TableCell
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-fit cursor-default truncate text-[11px] md:text-xs">
                          {user.email}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              )}
              {visibleCols.role && (
                <TableCell
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                >
                  <Badge
                    variant={
                      user.role === USER_ROLES.ADMIN
                        ? "destructive"
                        : user.role === USER_ROLES.OPERATOR
                          ? "default"
                          : "outline"
                    }
                    className="text-[10px] font-bold uppercase"
                  >
                    {user.role || "user"}
                  </Badge>
                </TableCell>
              )}
              {visibleCols.status && (
                <TableCell
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                  className="flex items-center gap-2"
                >
                  <Badge
                    variant={"outline"}
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      user.banned && "text-destructive"
                    )}
                  >
                    {user.banned ? `Banned` : "Active"}
                  </Badge>
                </TableCell>
              )}
              {visibleCols.created && (
                <TableCell
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                >
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              )}
              {visibleCols.actions && (
                <TableCell
                  className="flex items-center justify-end"
                  style={{
                    height: cellHeight,
                    maxHeight: cellHeight,
                    minHeight: cellHeight,
                  }}
                >
                  <Button variant="outline" size={"icon-sm"}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
          {Array.from({
            length: Math.max(0, limit - users.length),
          }).map((_, index) => {
            return (
              <TableRow key={`empty-${index}`} className={"even:bg-muted/50"}>
                {visibleCols.name && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                  >
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.email && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                  >
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.role && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                  >
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.status && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.created && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                  >
                    <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                      -
                    </div>
                  </TableCell>
                )}
                {visibleCols.actions && (
                  <TableCell
                    style={{
                      height: cellHeight,
                      maxHeight: cellHeight,
                      minHeight: cellHeight,
                    }}
                    className="flex items-center justify-end"
                  >
                    <Button variant="outline" size={"icon-sm"} disabled>
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
