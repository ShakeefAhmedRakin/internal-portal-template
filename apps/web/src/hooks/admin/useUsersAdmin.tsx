import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsersAdmin(initialLimit = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const offset = (currentPage - 1) * limit;

  const options = orpc.admin.getUsers.queryOptions({
    input: { limit, offset },
  });

  const query = useQuery({
    ...options,
    queryKey: ["admin", "users", { limit, offset }],
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
