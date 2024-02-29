import { z } from "zod";

const generateInvoiceSchema = (itemCount: number) => {
  let itemFields: Record<string, z.ZodTypeAny> = {};
  for (let i = 0; i < itemCount; i++) {
    itemFields[`description${i}`] = z
      .string({
        invalid_type_error: "Description is required.",
      })
      .min(1, "Description is required.");
    itemFields[`qty${i}`] = z.number().min(1, "Quantity must be at least 1");
    itemFields[`unitPrice${i}`] = z.string().min(1, "Unit price is required");
    itemFields[`taxRate${i}`] = z.enum(["9", "0"]);
  }
  return itemFields;
};

export const updateInvoiceSchema = (itemCount: number) => {
  return z
    .object({
      ...generateInvoiceSchema(itemCount),
      issueDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Invalid date",
      }),
      dueDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Invalid date",
      }),
      specialDiscount: z
        .string({
          invalid_type_error: "Special discount is required.",
        })
        .min(1, { message: "Special discount is required" }),
    })
    .refine(
      (data) => {
        if (data.issueDate && data.dueDate) {
          return data.issueDate < data.dueDate;
        }
        return true;
      },
      {
        message: "Due date must be after issue date",
        path: ["dueDate"],
      }
    );
};

export const createInvoiceSchema = (itemCount: number) => {
  return z
    .object({
      ...generateInvoiceSchema(itemCount),
      customer: z
        .string({ invalid_type_error: "Customer is required." })
        .min(1, { message: "Customer is required" }),
      contact: z
        .string({ invalid_type_error: "Customer is required." })
        .min(1, { message: "Customer is required" }),
      issueDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Invalid date",
      }),
      dueDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Invalid date",
      }),
      specialDiscount: z
        .string({
          invalid_type_error: "Special discount is required.",
        })
        .min(1, { message: "Special discount is required" }),
    })
    .refine(
      (data) => {
        if (data.issueDate && data.dueDate) {
          return data.issueDate < data.dueDate;
        }
        return true;
      },
      {
        message: "Due date must be after issue date",
        path: ["dueDate"],
      }
    );
};
