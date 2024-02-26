import { z } from "zod";

export const updateCustomerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  street: z
    .string({
      required_error: "Street is required",
    })
    .min(1, { message: "Street is required" }),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, { message: "City is required" }),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(1, { message: "State is required" }),
  postcode: z
    .string({
      required_error: "Postcode is required",
    })
    .min(1, { message: "Postcode is required" }),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .min(1, { message: "Phone is required" }),
});

export const createCustomerSchema = z.object({
  ...updateCustomerSchema.shape,
  contactName: z
    .string({
      required_error: "Contact Name is required",
    })
    .min(1, { message: "Contact Name is required" }),
  title: z.enum(["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."], {
    required_error: "Title is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
});
