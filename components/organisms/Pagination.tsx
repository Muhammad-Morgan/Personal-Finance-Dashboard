import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
type ButtonProps = {
  page: number;
  activeClass: boolean;
};
type PaginationProps = {
  currentPage: number;
  totalPages: number;
};
const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const memoizedFilters = useMemo(() => {
    const from = searchParams.get("from") ?? "";
    const to = searchParams.get("to") ?? "";
    const type = searchParams.get("type") ?? "all";
    return { from, to, type };
  }, [searchParams]);

  // paginating function
  const handlePaginating = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams();
      if (memoizedFilters.from) {
        params.set("from", memoizedFilters.from);
      }
      if (memoizedFilters.to) {
        params.set("to", memoizedFilters.to);
      }
      if (memoizedFilters.type && memoizedFilters.type !== "all") {
        params.set("type", memoizedFilters.type);
      }
      params.set("page", String(nextPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [memoizedFilters, pathname, router]
  );
  // helper function
  const addButton = ({ page, activeClass }: ButtonProps) => (
    <Button
      key={page}
      size="icon"
      variant={activeClass ? "default" : "outline"}
      type="button"
      onClick={() => handlePaginating(page)}
      aria-current={activeClass ? "page" : undefined}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </Button>
  );
  // rendering buttons
  const renderPageButtons = (): React.ReactNode[] => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addButton({
        page: 1,
        activeClass: currentPage === 1,
      })
    );
    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span
          key="dots-1"
          className="px-3 py-2 text-muted-foreground"
          aria-hidden="true"
        >
          …
        </span>
      );
    }
    // a button before the current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // current page button
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }
    // one button after the current page
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }
    // dots
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <span
          key="dots-2"
          className="px-3 py-2 text-muted-foreground"
          aria-hidden="true"
        >
          …
        </span>
      );
    }
    //   last page
    pageButtons.push(
      addButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    //   return the array
    return pageButtons;
  };
  return (
    <section className="flex gap-x-2">
      {/* Prev */}
      <Button
        variant="outline"
        className="flex items-center gap-x-2"
        onClick={() => {
          const prevPage: number = currentPage - 1;
          handlePaginating(prevPage);
        }}
        disabled={currentPage <= 1}
        type="button"
        aria-label="Go to previous page"
      >
        <ChevronLeft />
        Prev
      </Button>
      {/* rest of buttons */}
      {renderPageButtons()}
      {/* Next */}
      <Button
        variant="outline"
        className="flex items-center gap-x-2"
        disabled={currentPage >= totalPages}
        onClick={() => {
          const nextPage: number = currentPage + 1;
          handlePaginating(nextPage);
        }}
        type="button"
        aria-label="Go to next page"
      >
        Next
        <ChevronRight />
      </Button>
    </section>
  );
};

export default Pagination;
