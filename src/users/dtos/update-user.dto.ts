import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const UpdateUserSchema = z.object({
  name: z.string().trim().min(1).max(50).optional(),
  email: z.string().trim().min(1).max(50).toLowerCase().email().optional(),
  password: z.string().min(1).max(50).optional(),
});

// class is required for using DTO as a type
export class UpdateUserDTO extends createZodDto(UpdateUserSchema) {}
