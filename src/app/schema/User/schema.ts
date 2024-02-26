import { z } from "zod";

export const signupSchema = z.object({
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
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .min(1, { message: "Phone is required" }),
  agreewithtnc: z
    .boolean({
      required_error: "You must agree with terms and conditions",
    })
    .refine((val) => val === true, {
      message: "You must agree with terms and conditions",
    }),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const confirmSignupSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(7, { message: "Password must be at least 7 characters" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

