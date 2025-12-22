import { ChartArea, ListCheckIcon, LucideCreditCard } from "lucide-react";

export const links = [
  {
    id: 1,
    href: "/dashboard",
    label: "Dashboard",
    icon: <ChartArea />,
  },
  {
    id: 2,
    href: "/dashboard/createtransaction",
    label: "Create",
    icon: <LucideCreditCard />,
  },
  {
    id: 3,
    href: "/dashboard/transactionslist",
    label: "All Transactions",
    icon: <ListCheckIcon />,
  },
];
