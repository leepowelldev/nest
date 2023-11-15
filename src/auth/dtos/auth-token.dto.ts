import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const AuthTokenSchema = z.object({
  access_token: z.string(),
});

// class is required for using DTO as a type
export class AuthTokenDTO extends createZodDto(AuthTokenSchema) {}
