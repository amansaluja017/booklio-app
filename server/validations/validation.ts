import { z } from "zod";

export const customerRegister = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z
    .email()
    .includes("@", "Email must contain '@'")
    .endsWith("gmail.com", "Email must end with 'gmail.com'")
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long")
    .transform((pass) => pass.trim()),
  // phone: z
  //   .string()
  //   .min(10, "Phone number must be at least 10 characters long")
  //   .max(10, "Phone number must be at most 10 characters long")
  //   .optional(),
});

export const updateAddress = z.object({

  country: z.string().min(3, "Country must be at least 3 characters long"),
  city: z.string().min(4, "City must be at least 4 characters long"),
  state: z.string().min(4, "State must be at least 4 characters long"),
  zipCode: z
    .string()
    .min(6, "Zip code must be at least 6 characters long")
    .max(6, "Zip code must be at most 6 characters long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(10, "Phone number must be at most 10 characters long")
    .optional(),

});

export const providerRegister = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: z
    .email()
    .includes("@", "Email must contain '@'")
    .endsWith("gmail.com", "Email must end with 'gmail.com'")
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password should meet all requirments",
    )
    .transform((pass) => pass.trim()),
});

export const storeSetup = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(10, "Phone number must be at most 10 characters long")
    .optional(),
  store: z
    .string()
    .min(3, "Company name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Company name must contain only letters and spaces")
    .optional(),

  city: z.string().min(4, "City must be at least 4 characters long"),
  state: z.string().min(4, "State must be at least 4 characters long"),
  country: z.string().min(3, "Country must be at least 3 characters long"),
  zipCode: z
    .string()
    .min(6, "Zip code must be at least 6 characters long")
    .max(6, "Zip code must be at most 6 characters long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
});

export const adminRegister = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: z
    .email()
    .includes("@", "Email must contain '@'")
    .endsWith("gmail.com", "Email must end with 'gmail.com'")
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password should meet all requirments",
    )
    .transform((pass) => pass.trim()),
});

export const createServiceValidataions = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),
  category: z.string(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  price: z
    .string()
    .min(1, "Price must be at least 1 character long")
    .max(10, "Price must be at most 10 characters long"),
  images: z
    .array(z.string().url("Image URL must be a valid URL"))
    .min(1, "At least one image is required")
    .optional(),
  status: z.boolean().default(true),
});

export const createBookingValidations = z.object({
  service: z.string().min(3, "Service must be at least 3 characters long"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters long"),
  status: z.string(),
  // date: z.string().refine((date) => {
  //   const parsedDate = Date.parse(date);
  //   return !isNaN(parsedDate);
  // }, {
  //   message: "Date must be a valid date string",
  // }),
  image: z.string().url("Image URL must be a valid URL").optional(),
  provider: z.string().min(3, "Provider must be at least 3 characters long"),
  notes: z.string().max(500, "Notes must be at most 500 characters long").optional(),
});

export const createCategoryValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),
  services: z
    .array(z.string().min(3, "Service must be at least 3 characters long"))
    .min(1, "At least one service is required"),
});

export const updateCustomerPassword = z.object({
  oldPassword: z.string(),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password should meet all requirments",
    )
    .transform((pass) => pass.trim()),

  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password should meet all requirments",
    )
    .transform((pass) => pass.trim()),
});
