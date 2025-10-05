"use client";

import useUsersAdmin from "@/hooks/admin/useUsersAdmin";
import type { User } from "better-auth";
import UserTable from "./user-table";
import UsersTableBottomControls from "./users-table-bottom-controls";
import UsersTableTopControls from "./users-table-top-controls";

export default function UsersTableContainer({ user }: { user: User }) {
  const {
    data,
    isLoading,
    // Pagination state
    currentPage,
    limit,
    offset,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    // Pagination actions
    nextPage,
    prevPage,
    searchValue,
    setSearchValue,
  } = useUsersAdmin(10);

  return (
    <div className="flex h-full max-h-full flex-col space-y-4">
      <UsersTableTopControls
        isLoading={isLoading}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <UserTable users={data?.users || []} limit={limit} user={user} />

      <UsersTableBottomControls
        offset={offset}
        limit={limit}
        total={total}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        isLoading={isLoading}
      />
    </div>
  );
}
