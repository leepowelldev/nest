import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDTO } from "./dtos/credentials.dto";
import { ZodSerializerDto } from "nestjs-zod";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ZodSerializerDto(AuthTokenDTO)
  signIn(@Body() { email, password }: CredentialsDTO) {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() request) {
    return request.user;
  }
}
