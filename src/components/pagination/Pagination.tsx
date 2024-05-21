"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";

import { numberFormat } from "@/lib/number";
import { cn } from "@/lib/utils";

interface Props {
  total: number;
  limit: number;
  page: number;
  customPath?: string;
}

const Component: React.FC<Props> = ({ total = 100, limit = 10, page = 1, customPath }) => {
  const originalPathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const pathname = customPath || originalPathname;

  const maxPageButtons = 10;
  const totalPages = Math.ceil(total / limit);
  // const startPage = Math.max(1, (Math.ceil(currentPage / maxPageButtons) - 1) * maxPageButtons + 1);
  // const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // 클라이언트에서 부분렌더링이 되는 경우가 있어서 searchParams가 변경된경우 catch하여 업데이트
  useEffect(() => {
    if (searchParams.has("page")) {
      setCurrentPage(Number(searchParams.get("page")));
    }
  }, [searchParams]);

  const queryString = useCallback(
    (page: number, limit: number) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
      params.set("page", String(page));
      params.set("limit", String(limit));
      return params.toString();
    },
    [searchParams]
  );

  const getPath = (page: number) => {
    return `${pathname}?${queryString(page, limit)}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationFirst href={getPath(1)} disabled={currentPage === 1} />
        <PaginationPrevious href={getPath(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from(Array(Math.min(10, Math.ceil(total / limit))).keys()).map((i) => {
          const pageNumber = currentPage <= 5 ? i + 1 : currentPage - 5 + i + 1;
          if (pageNumber > Math.ceil(total / limit)) {
            return null;
          } else {
            return (
              <PaginationLink
                key={`pagination-${pageNumber}`}
                href={`${pathname}?${queryString(pageNumber, limit)}`}
                isActive={pageNumber === currentPage}
                size="default"
              >
                {numberFormat(pageNumber)}
              </PaginationLink>
            );
          }
        })}
        <PaginationNext href={getPath(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} />
        <PaginationLast href={getPath(totalPages)} disabled={currentPage === totalPages || totalPages === 0} />
      </PaginationContent>
    </Pagination>
  );
};

export default Component;
