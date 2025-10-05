"use client";

import ErrorCard from "@/components/error-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Heading, Paragraph } from "@/components/ui/typography";
import useUsersAdmin from "@/hooks/admin/useUsersAdmin";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function UsersTable() {
  const {
    data,
    isLoading,
    error,
    refetch,
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
  } = useUsersAdmin(10);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heading level="h5" className="font-semibold">
            Users
          </Heading>
          <Skeleton className="h-6 w-8" />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[250px]">Email</TableHead>
                <TableHead className="w-[120px]">Role</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Created</TableHead>
                <TableHead className="w-[10px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: limit }).map((_, index) => (
                <TableRow
                  key={`loading-${index}`}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted"}
                >
                  <TableCell className="h-[47px] font-medium">
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="h-[47px]">
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="h-[47px]">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="h-[47px]">
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </TableCell>
                  <TableCell className="h-[47px]">
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell className="h-[47px]">
                    <Skeleton className="h-5 w-5 rounded" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Loading pagination placeholder */}
        <div className="flex items-center justify-between gap-x-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorCard refetch={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heading level="h5" className="font-semibold">
          Users
        </Heading>
        <Badge variant="default">{total}</Badge>
      </div>

      <div className="rounded-md border">
        <Table className="!thin-styled-scroll-container overflow-x-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="w-[120px]">Role</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Created</TableHead>
              <TableHead className="w-[10px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users && data.users.length > 0 ? (
              <>
                {data.users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted"}
                  >
                    <TableCell className="h-[47px] font-medium">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="max-w-[180px] truncate">
                              {user.name}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="h-[47px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="max-w-[230px] truncate">
                              {user.email}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user.email}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="h-[47px]">
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                        className="font-bold uppercase"
                      >
                        {user.role || "user"}
                      </Badge>
                    </TableCell>
                    <TableCell className="h-[47px]">
                      <Badge
                        variant={user.banned ? "destructive" : "outline"}
                        className="font-bold uppercase"
                      >
                        {user.banned ? "Banned" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="h-[47px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="max-w-[100px] truncate">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{new Date(user.createdAt).toLocaleString()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="flex h-[47px] w-full justify-end">
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Fill remaining rows to make 10 total */}
                {Array.from({
                  length: Math.max(0, limit - data.users.length),
                }).map((_, index) => {
                  const rowIndex = data.users.length + index;
                  return (
                    <TableRow
                      key={`empty-${index}`}
                      className={`opacity-0 ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted"}`}
                    >
                      <TableCell className="h-[47px] max-w-[180px] truncate font-medium">
                        -
                      </TableCell>
                      <TableCell className="h-[47px] max-w-[230px] truncate">
                        -
                      </TableCell>
                      <TableCell className="h-[47px]">-</TableCell>
                      <TableCell className="h-[47px]">-</TableCell>
                      <TableCell className="h-[47px] max-w-[100px] truncate">
                        -
                      </TableCell>
                      <TableCell className="h-[47px]">-</TableCell>
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <>
                {/* Show 10 empty rows when no users */}
                {Array.from({ length: limit }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className={`opacity-0 ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
                  >
                    <TableCell className="h-[47px] max-w-[180px] truncate font-medium">
                      -
                    </TableCell>
                    <TableCell className="h-[47px] max-w-[230px] truncate">
                      -
                    </TableCell>
                    <TableCell className="h-[47px]">-</TableCell>
                    <TableCell className="h-[47px]">-</TableCell>
                    <TableCell className="h-[47px] max-w-[100px] truncate">
                      -
                    </TableCell>
                    <TableCell className="h-[47px]">-</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between gap-x-2">
        <Paragraph className="text-muted-foreground font-semibold" size="xs">
          Showing {offset + 1} to {Math.min(offset + limit, total)} of {total}{" "}
          users
        </Paragraph>
        <div className="flex items-center space-x-2">
          <ButtonGroup>
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={!hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <ButtonGroupSeparator />
            <ButtonGroupText className="whitespace-nowrap">
              {currentPage} of {totalPages}
            </ButtonGroupText>
            <ButtonGroupSeparator />
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!hasNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
