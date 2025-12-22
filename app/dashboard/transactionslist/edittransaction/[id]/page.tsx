import EditForm from "@/components/organisms/EditForm";
import { getSingleTransactionAction } from "@/lib/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PageProps = {
  params: {
    id: string;
  };
};
const EditTransactionPage = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();
  const { id } = params;
  await queryClient.prefetchQuery({
    queryKey: ["transaction", id],
    queryFn: () => getSingleTransactionAction(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditForm transactionId={id} />
    </HydrationBoundary>
  );
};

export default EditTransactionPage;
