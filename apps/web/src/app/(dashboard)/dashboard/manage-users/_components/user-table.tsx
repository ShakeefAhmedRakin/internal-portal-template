import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UsersAdminUserType } from "@/hooks/admin/useUsersAdmin";
import type { User } from "better-auth";
import UserTableFillerRow from "./user-table-filler-row";
import UserTableRow from "./user-table-row";

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
    updated: boolean;
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
          {visibleCols.role && <col style={{ width: "80px" }} />}
          {visibleCols.status && <col style={{ width: "80px" }} />}
          {visibleCols.created && <col style={{ width: "100px" }} />}
          {visibleCols.updated && <col style={{ width: "100px" }} />}
          {visibleCols.actions && <col style={{ width: "60px" }} />}
        </colgroup>
        <TableHeader className="bg-muted sticky top-0">
          <TableRow>
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
            {visibleCols.updated && (
              <TableHead className="text-xs">Updated</TableHead>
            )}
            {visibleCols.actions && (
              <TableHead className="text-right text-xs">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <UserTableRow
              key={u.id}
              user={u}
              currentUserId={currentUserId}
              visibleCols={visibleCols}
            />
          ))}

          {Array.from({ length: Math.max(0, limit - users.length) }).map(
            (_, index) => (
              <UserTableFillerRow
                key={`empty-${index}`}
                index={index}
                visibleCols={visibleCols}
              />
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
