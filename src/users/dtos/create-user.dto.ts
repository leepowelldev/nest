import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const CreateUserSchema = z.object({
  name: z.string().trim().min(1).max(50).describe("User name"),
  email: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .toLowerCase()
    .email()
    .describe("User email"),
  password: z.string().min(1).max(50).describe("User password"),
});

// class is required for using DTO as a type
export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
