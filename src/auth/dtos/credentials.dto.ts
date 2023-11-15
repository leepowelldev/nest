import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const CredentialsSchema = z.object({
  email: z.string().trim().min(1).max(50).toLowerCase().email(),
  password: z.string().min(1).max(50),
});

// class is required for using DTO as a type
export class CredentialsDTO extends createZodDto(CredentialsSchema) {}
