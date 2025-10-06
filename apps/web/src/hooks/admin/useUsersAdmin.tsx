import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type UsersAdminData = Awaited<
  ReturnType<ReturnType<typeof orpc.admin.getUsers.queryOptions>["queryFn"]>
>;

export type UsersAdminUserType = UsersAdminData["users"][number];

export default function useUsersAdmin(initialLimit = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [bannedFilter, setBannedFilter] = useState<boolean | undefined>(
    undefined
  );
  const offset = (currentPage - 1) * limit;

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, roleFilter, bannedFilter]);

  const options = orpc.admin.getUsers.queryOptions({
    input: {
      limit,
      offset,
      searchValue,
      roleFilter,
      bannedFilter,
    },
  });

  const query = useQuery({
    ...options,
    queryKey: [
      "admin",
      "users",
      {
        limit,
        offset,
        searchValue,
        roleFilter,
        bannedFilter,
      },
    ],
    enabled: !!limit && offset >= 0,
  });

  // Pagination calculations
  const total = query.data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Navigation functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    ...query,
    // Pagination state
    currentPage,
    limit,
    offset,
    searchValue,
    setSearchValue,
    roleFilter,
    setRoleFilter,
    bannedFilter,
    setBannedFilter,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,

    // Pagination actions
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    setLimit,
  };
}
