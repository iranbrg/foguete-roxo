import CreateSessionService from "../../src/services/CreateSessionService";
import CreateUserService from "../../src/services/CreateUserService";
import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import HashProvider from "../../src/utils/providers/HashProvider/fakes/HashProvider";
import AppError from "../../src/errors/AppError";

let usersRepository;
let hashProvider;
let createSessionService;
let createUserService;

describe("CreateSession", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();

    createSessionService = new CreateSessionService({
      usersRepository,
      hashProvider
    });

    createUserService = new CreateUserService({
      usersRepository,
      hashProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Should create a new session, authenticating the user that just logged in", async () => {
    await createUserService.execute({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const userAuthorized = await createSessionService.execute({
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    expect(userAuthorized).toHaveProperty("token");
  });

  test("Shouldn't create a new session to a non existing user", async () => {
    expect.assertions(1);

    try {
      await createSessionService.execute({
        email: "jdoe2@email.com",
        password: "bigboobs69"
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("Shouldn't create a new session to a user that missmatches either his email or password", async () => {
    expect.assertions(1);

    const hashedPassword = await hashProvider.generateHash("bigboobs69");

    await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: hashedPassword
    });

    try {
      await createSessionService.execute({
        email: "jdoe@email.com",
        password: "bigboobs420"
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("Shouldn't create a new session to a user that missmatches the hashed password", async () => {
    expect.assertions(1);

    const hashedPassword = await hashProvider.generateHash("bigboobs69");

    await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: hashedPassword
    });

    try {
      await createSessionService.execute({
        email: "jdoe@email.com",
        password: "bigboobs420"
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
