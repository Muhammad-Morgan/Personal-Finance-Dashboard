import z from "zod";
// Register -- User
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be 3 characters at least"),
    email: z.email({ error: "Invalid email format" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(32, { error: "Password cannot exceed 32 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
// Login -- User
export const loginSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password cannot exceed 32 characters" }),
  rememberMe: z.boolean().optional(),
});
export type LoginSchema = z.infer<typeof loginSchema>;
// Create Transaction -- Transaction + Category
export const createTransactionSchema = z.object({
  amount: z.coerce.number().positive(),
  date: z.coerce.date(),
  description: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"]),
  recurring: z.boolean().default(false),
  categoryName: z.string().trim().optional(),
});
export type CreateTransaction = z.input<typeof createTransactionSchema>;
