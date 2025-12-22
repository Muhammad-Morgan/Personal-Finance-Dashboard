import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/organisms/Pagination";

const pushMock = vi.fn();
let paramsString = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/dashboard/transactionslist",
  useSearchParams: () => {
    const params = new URLSearchParams(paramsString);
    return {
      get: (key: string) => params.get(key),
      toString: () => params.toString(),
    };
  },
}));

describe("Pagination integration", () => {
  beforeEach(() => {
    pushMock.mockClear();
    paramsString = "";
  });

  test("preserves filters when advancing to the next page", async () => {
    paramsString = "from=2025-01-01&type=INCOME";
    render(<Pagination currentPage={1} totalPages={4} />);

    await userEvent.click(
      screen.getByRole("button", { name: /go to next page/i })
    );

    expect(pushMock).toHaveBeenCalledWith(
      "/dashboard/transactionslist?from=2025-01-01&type=INCOME&page=2"
    );
  });

  test("disables the previous button on the first page and navigates otherwise", async () => {
    paramsString = "type=EXPENSE&page=3";
    const { rerender } = render(<Pagination currentPage={1} totalPages={3} />);

    const prevButton = screen.getByRole("button", {
      name: /go to previous page/i,
    });
    expect(prevButton).toBeDisabled();

    rerender(<Pagination currentPage={3} totalPages={3} />);
    await userEvent.click(prevButton);

    expect(pushMock).toHaveBeenCalledWith(
      "/dashboard/transactionslist?type=EXPENSE&page=2"
    );
  });
});
