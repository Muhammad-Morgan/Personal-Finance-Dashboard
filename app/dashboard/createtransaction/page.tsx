import CreateTransactionForm from "@/components/organisms/CreateTransactionForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const CreateTransaction = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateTransactionForm />
      <div className="mt-8 grid gap-3 justify-center text-center">
        <h2 className="text-xl tracking-wide">You are in control!</h2>
        <p className="text-sm tracking-wider">
          The data you share can only be accessed by you.
        </p>
      </div>
    </HydrationBoundary>
  );
};

export default CreateTransaction;
