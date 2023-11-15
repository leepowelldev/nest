import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async create(createUserDTO: CreateUserDTO) {
    return await this.prisma.user.create({
      data: createUserDTO,
    });
  }

  async updateById(id: number, updateUserDTO: UpdateUserDTO) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDTO,
    });
  }

  async deleteById(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
