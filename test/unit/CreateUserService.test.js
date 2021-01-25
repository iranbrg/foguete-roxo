import CreateUserService from "../../src/services/CreateUserService";
import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import HashProvider from "../../src/utils/providers/HashProvider/fakes/HashProvider";
import AppError from "../../src/errors/AppError";

let usersRepository;
let hashProvider;
let createUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();

    createUserService = new CreateUserService({
      usersRepository,
      hashProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Should create a new user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    expect(user).toHaveProperty("name", "John Doe");
    expect(user).toHaveProperty("email", "jdoe@email.com");
    expect(user).toHaveProperty("password");
  });

  test("Shouldn't a new user with an existing email", async () => {
    expect.assertions(1);
    try {
      await createUserService.execute({
        name: "John Doe",
        email: "jdoe@email.com",
        password: "bigboobs69"
      });

      await createUserService.execute({
        name: "John Doe",
        email: "jdoe@email.com",
        password: "bigboobs69"
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
