"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const Filters = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const typeParam = searchParams.get("type") ?? "all";

  const fromInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const toInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;

  const pathname = usePathname();
  const router = useRouter();
  // just something to enhance UX a little
  const openDatePicker = (ref: React.RefObject<HTMLInputElement>) => {
    const elment = ref.current as HTMLInputElement & {
      showPicker?: () => void;
    };
    if (!elment) return;
    if (typeof elment.showPicker === "function") {
      elment.showPicker();
    } else {
      elment.focus();
    }
  };

  const clearDates = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fromDate = (formData.get("from") as string) ?? "";
    const toDate = (formData.get("to") as string) ?? "";
    const type = (formData.get("type") as string) ?? "all";

    const params = new URLSearchParams(searchParams.toString());
    if (fromDate) params.set("from", fromDate);
    else params.delete("from");
    if (toDate) params.set("to", toDate);
    else params.delete("to");
    if (type !== "all") params.set("type", type);
    else params.delete("type");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="bg-muted mb-16 p-8 rounded-lg">
      <h3 className="text-xl mb-4">Filter Transactions</h3>
      <form
        onSubmit={handleSubmit}
        className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          className="rounded-lg cursor-pointer"
          onClick={() => openDatePicker(fromInputRef)}
        >
          <label htmlFor="from">From</label>
          <Input
            key={from}
            ref={fromInputRef}
            className="bg-background dark:bg-background tracking-wider"
            type="date"
            defaultValue={from}
            name="from"
            id="from"
          />
        </div>
        <div
          className="rounded-lg cursor-pointer"
          onClick={() => openDatePicker(toInputRef)}
        >
          <label htmlFor="to">To</label>
          <Input
            key={to}
            ref={toInputRef}
            className="bg-background dark:bg-background tracking-wider"
            type="date"
            defaultValue={to}
            name="to"
            id="to"
          />
        </div>
        <div className="rounded-lg">
          <div className="flex items-center justify-between">
            <label htmlFor="type">Type</label>
          </div>
          <Select name="type" defaultValue={typeParam}>
            <SelectTrigger className="w-full bg-background dark:bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["all", "INCOME", "EXPENSE"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-lg flex flex-col justify-end">
          <Button type="submit" className="w-full">
            Search
          </Button>
        </div>
        <div className="rounded-lg flex flex-col justify-end">
          <Button
            className="text-start hover:opacity-85 cursor-pointer"
            type="button"
            variant="ghost"
            onClick={clearDates}
          >
            Clear dates
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Filters;
