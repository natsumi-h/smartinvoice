import { z } from "zod";

export const createNewUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  role: z.enum(["Admin", "User"]),
});

export const updateCompanySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  uen: z
    .string({
      required_error: "UEN is required",
    })
    .min(1, { message: "UEN is required" }),
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
  bankname: z
    .string({
      required_error: "Bankname is required",
    })
    .min(1, { message: "Bankname is required" }),
  branchname: z
    .string({
      required_error: "Branchname is required",
    })
    .min(1, { message: "Branchname is required" }),
  accountname: z
    .string({
      required_error: "Accountname is required",
    })
    .min(1, { message: "Accountname is required" }),
  accountnumber: z.string({ required_error: "Accountnumber is required" }).min(1, {
    message: "Accountnumber is required",
  }),
  bankcode: z.string({ required_error: "Bankcode is required" }).min(1, {
    message: "Bankcode is required",
  }),
  swiftcode: z.string({ required_error: "Swiftcode is required" }).min(1, {
    message: "Swiftcode is required",
  }),
  branchnumber: z.string({ required_error: "Branchnumber is required" }).min(1, {
    message: "Branchnumber is required",
  }),
  accounttype: z.enum(["Savings", "Current"]),
  remarks: z.string().optional(),
});
