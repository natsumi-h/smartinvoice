import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  title: z.enum(["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."], {
    required_error: "Title is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  isPrimary: z.boolean(),
});
