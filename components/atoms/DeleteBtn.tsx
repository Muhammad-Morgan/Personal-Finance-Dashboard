import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Loader2, Trash2Icon } from "lucide-react";
import { deleteTransactionAction } from "@/lib/actions";
import { toast } from "sonner";

const DeleteBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteTransactionAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("There was an error");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      return toast.success("Transaction removed");
    },
  });
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      className="col-span-3 tracking-wide"
      aria-label={isPending ? "Deleting transaction" : "Delete transaction"}
      aria-busy={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Deleting transaction</span>
        </>
      ) : (
        <>
          <Trash2Icon aria-hidden="true" />
          <span className="hidden lg:inline">Delete</span>
          <span className="sr-only">Delete transaction</span>
        </>
      )}
    </Button>
  );
};

export default DeleteBtn;
