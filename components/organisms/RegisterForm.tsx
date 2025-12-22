"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { CustomFormField } from "../molecules/FormComponents";
import { registerSchema, type RegisterSchema } from "@/lib/zodSchemas";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "registeration failed");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "registered successfully !");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="space-y-5"
      >
        <CustomFormField name="name" type="text" control={form.control} />
        <CustomFormField name="email" type="email" control={form.control} />
        <CustomFormField
          name="password"
          type="password"
          control={form.control}
        />
        <CustomFormField
          name="confirmPassword"
          type="password"
          control={form.control}
        />
        <Button className="mb-2 w-full" type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
