import Filters from "@/components/organisms/Filters";
import TransactionsList from "@/components/layouts/TransactionsList";
import { getAllTransactionsAction } from "@/lib/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
const AllTransactions = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["transactions", "", "", "all", 1],
    queryFn: () => getAllTransactionsAction({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filters />
      <TransactionsList />
    </HydrationBoundary>
  );
};

export default AllTransactions;
