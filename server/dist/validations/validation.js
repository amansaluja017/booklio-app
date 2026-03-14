"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerPassword = exports.createCategoryValidation = exports.createBookingValidations = exports.createServiceValidataions = exports.loginAdminValidations = exports.adminRegister = exports.storeSetup = exports.loginProviderValidation = exports.providerRegister = exports.updateAddress = exports.loginCustomerValidation = exports.customerRegister = void 0;
const zod_1 = require("zod");
exports.customerRegister = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
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
exports.loginCustomerValidation = zod_1.z.object({
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .transform((pass) => pass.trim()),
});
exports.updateAddress = zod_1.z.object({
    country: zod_1.z.string().min(3, "Country must be at least 3 characters long"),
    city: zod_1.z.string().min(4, "City must be at least 4 characters long"),
    state: zod_1.z.string().min(4, "State must be at least 4 characters long"),
    zipCode: zod_1.z
        .string()
        .min(6, "Zip code must be at least 6 characters long")
        .max(6, "Zip code must be at most 6 characters long"),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 characters long")
        .max(10, "Phone number must be at most 10 characters long")
        .optional(),
});
exports.providerRegister = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password should meet all requirments")
        .transform((pass) => pass.trim()),
});
exports.loginProviderValidation = zod_1.z.object({
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .transform((pass) => pass.trim()),
});
exports.storeSetup = zod_1.z.object({
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 characters long")
        .max(10, "Phone number must be at most 10 characters long")
        .optional(),
    store: zod_1.z
        .string()
        .min(3, "Company name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Company name must contain only letters and spaces")
        .optional(),
    city: zod_1.z.string().min(4, "City must be at least 4 characters long"),
    state: zod_1.z.string().min(4, "State must be at least 4 characters long"),
    country: zod_1.z.string().min(3, "Country must be at least 3 characters long"),
    zipCode: zod_1.z
        .string()
        .min(6, "Zip code must be at least 6 characters long")
        .max(6, "Zip code must be at most 6 characters long"),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(500, "Description must be at most 500 characters long"),
});
exports.adminRegister = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password should meet all requirments")
        .transform((pass) => pass.trim()),
});
exports.loginAdminValidations = zod_1.z.object({
    email: zod_1.z
        .email()
        .includes("@", "Email must contain '@'")
        .endsWith("gmail.com", "Email must end with 'gmail.com'")
        .transform((email) => email.trim().toLowerCase()),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .transform((pass) => pass.trim()),
});
exports.createServiceValidataions = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters long"),
    category: zod_1.z.string(),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(500, "Description must be at most 500 characters long"),
    price: zod_1.z
        .string()
        .min(1, "Price must be at least 1 character long")
        .max(10, "Price must be at most 10 characters long"),
    images: zod_1.z
        .array(zod_1.z.string().url("Image URL must be a valid URL"))
        .min(1, "At least one image is required")
        .optional(),
    status: zod_1.z.boolean().default(true),
});
exports.createBookingValidations = zod_1.z.object({
    service: zod_1.z.string().min(3, "Service must be at least 3 characters long"),
    category: zod_1.z
        .string()
        .min(3, "Category must be at least 3 characters long"),
    status: zod_1.z.string(),
    // date: z.string().refine((date) => {
    //   const parsedDate = Date.parse(date);
    //   return !isNaN(parsedDate);
    // }, {
    //   message: "Date must be a valid date string",
    // }),
    image: zod_1.z.string().url("Image URL must be a valid URL").optional(),
    provider: zod_1.z.string().min(3, "Provider must be at least 3 characters long"),
    notes: zod_1.z.string().max(500, "Notes must be at most 500 characters long").optional(),
});
exports.createCategoryValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters long"),
    services: zod_1.z
        .array(zod_1.z.string().min(3, "Service must be at least 3 characters long"))
        .min(1, "At least one service is required"),
});
exports.updateCustomerPassword = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password should meet all requirments")
        .transform((pass) => pass.trim()),
    confirmPassword: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(15, "Password must be at most 15 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password should meet all requirments")
        .transform((pass) => pass.trim()),
});
