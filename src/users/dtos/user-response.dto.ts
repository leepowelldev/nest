import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// class is required for using DTO as a type
export class UserResponseDTO extends createZodDto(UserResponseSchema) {}
