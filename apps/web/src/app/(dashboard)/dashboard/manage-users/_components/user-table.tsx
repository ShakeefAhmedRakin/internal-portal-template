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
}: {
  users: UsersAdminUserType[];
  limit: number;
  user: User;
}) {
  const currentUserId = user.id;
  return (
    <div className="thin-styled-scroll-container h-full flex-1 overflow-x-auto overflow-y-auto rounded-md border">
      <Table className="table-fixed">
        <colgroup>
          <col style={{ width: "200px" }} />
          <col style={{ width: "200px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "200px" }} />
          <col style={{ width: "50px" }} />
        </colgroup>
        <TableHeader className="bg-muted sticky top-0">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow className="even:bg-muted/50" key={user.id}>
              <TableCell style={{ height: cellHeight }}>
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
              <TableCell style={{ height: cellHeight }}>
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
              <TableCell style={{ height: cellHeight }}>
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
              <TableCell
                style={{ height: cellHeight }}
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
              <TableCell style={{ height: cellHeight }}>
                {new Date(user.createdAt).toLocaleString()}
              </TableCell>
              <TableCell
                className="flex items-center justify-end"
                style={{ height: cellHeight }}
              >
                <Button variant="outline" size={"icon-sm"}>
                  <MoreHorizontal />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {Array.from({
            length: Math.max(0, limit - users.length),
          }).map((_, index) => {
            return (
              <TableRow key={`empty-${index}`} className={"even:bg-muted/50"}>
                <TableCell style={{ height: cellHeight }}>
                  <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                    -
                  </div>
                </TableCell>
                <TableCell style={{ height: cellHeight }}>
                  <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                    -
                  </div>
                </TableCell>
                <TableCell style={{ height: cellHeight }}>
                  <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                    -
                  </div>
                </TableCell>
                <TableCell
                  style={{ height: cellHeight }}
                  className="flex items-center gap-2"
                >
                  <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                    -
                  </div>
                </TableCell>
                <TableCell style={{ height: cellHeight }}>
                  <div className="text-muted-foreground pl-2 text-[11px] md:text-xs">
                    -
                  </div>
                </TableCell>
                <TableCell
                  style={{ height: cellHeight }}
                  className="flex items-center justify-end"
                >
                  <Button variant="outline" size={"icon-sm"} disabled>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
