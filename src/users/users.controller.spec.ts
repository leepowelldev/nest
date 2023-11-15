import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.respository";
import { PrismaService } from "nestjs-prisma";
import { JwtService } from "@nestjs/jwt";

const mockUsersRepository = {
  findAll() {
    return [{ id: 1, name: "Jane Doe", email: "jane.doe@nationwide.co.uk" }];
  },
  findById(id: number) {
    return { id, name: "Jane Doe", email: "jane.doe@nationwide.co.uk" };
  },
};

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService, JwtService],
      controllers: [UsersController],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get all users", async () => {
    const expected = mockUsersRepository.findAll();
    const users = await controller.getUsers();

    expect(users).toEqual(expected);
  });

  it("should get a user", async () => {
    const expected = mockUsersRepository.findById(1);
    const users = await controller.getUser(1);

    expect(users).toEqual(expected);
  });
});
