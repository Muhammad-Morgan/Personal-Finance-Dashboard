import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "@/components/organisms/Filters";

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

describe("Filters integration", () => {
  beforeEach(() => {
    pushMock.mockClear();
    paramsString = "";
  });

  test("submits a date range and updates the query string", async () => {
    render(<Filters />);
    const fromInput = screen.getByLabelText(/from/i);
    const toInput = screen.getByLabelText(/to/i);

    fireEvent.change(fromInput, { target: { value: "2025-01-01" } });
    fireEvent.change(toInput, { target: { value: "2025-01-15" } });

    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(pushMock).toHaveBeenCalledWith(
      "/dashboard/transactionslist?from=2025-01-01&to=2025-01-15"
    );
  });

  test("clears date params but preserves other filters", async () => {
    paramsString = "from=2024-12-01&to=2024-12-31&type=EXPENSE&page=2";
    render(<Filters />);

    await userEvent.click(screen.getByRole("button", { name: /clear dates/i }));

    expect(pushMock).toHaveBeenCalledWith(
      "/dashboard/transactionslist?type=EXPENSE&page=2"
    );
  });
});
