"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FieldDescription } from "../ui/field";
import { Form } from "../ui/form";
import {
  CustomFormCheckbox,
  CustomFormField,
} from "../molecules/FormComponents";
import { loginSchema, type LoginSchema } from "@/lib/zodSchemas";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!data.ok) {
        throw new Error(data?.message ?? "unable to log in");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Logged in successfully");
      router.replace("/dashboard");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit((values) => mutate(values))}
      >
        <CustomFormField type="email" name="email" control={form.control} />
        <FieldDescription className="-mt-4 ml-1">
          We will never share your email.
        </FieldDescription>
        <CustomFormField
          type="password"
          name="password"
          control={form.control}
        />
        <CustomFormCheckbox
          name="rememberMe"
          labelText="remember me"
          control={form.control}
        />
        <Button className="mb-2 w-full" type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
