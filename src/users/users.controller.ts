import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ZodSerializerDto } from "nestjs-zod";
import { UserResponseDTO } from "./dtos/user-response.dto";
import { UsersRepository } from "./users.respository";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private userRepository: UsersRepository) {}

  @Get()
  @ApiOkResponse({
    type: UserResponseDTO,
    isArray: true,
    description: "Get all users",
  })
  @ZodSerializerDto(UserResponseDTO)
  // @UseGuards(AuthGuard)
  async getUsers() {
    return await this.userRepository.findAll();
  }

  @Post()
  @ApiOkResponse({
    status: 201,
    type: UserResponseDTO,
    description: "Creates a user",
  })
  @ApiConflictResponse({
    description: "Email already in use",
  })
  @ZodSerializerDto(UserResponseDTO)
  // @UseGuards(AuthGuard)
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userRepository.create(createUserDTO);
  }

  @Get("/:id")
  @ApiOkResponse({
    type: UserResponseDTO,
    description: "Get user by id",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ZodSerializerDto(UserResponseDTO)
  // @UseGuards(AuthGuard)
  async getUser(@Param("id", ParseIntPipe) id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Patch("/:id")
  @ApiOkResponse({
    type: UserResponseDTO,
    description: "Updates a user",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiConflictResponse({
    description: "Email already in use",
  })
  @ZodSerializerDto(UserResponseDTO)
  // @UseGuards(AuthGuard)
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.userRepository.updateById(id, updateUserDTO);
  }

  @Delete("/:id")
  @ApiOkResponse({
    type: UserResponseDTO,
    description: "Deletes a user",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  // @UseGuards(AuthGuard)
  async deleteUser(@Param("id", ParseIntPipe) id: number) {
    return await this.userRepository.deleteById(id);
  }
}
