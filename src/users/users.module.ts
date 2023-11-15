import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.respository";
import { PrismaModule, PrismaService } from "nestjs-prisma";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersRepository, PrismaService],
  exports: [UsersRepository],
})
export class UsersModule {}
