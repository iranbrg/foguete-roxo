import ListProvidersService from "../../src/services/ListProvidersService";
import UsersRepository from "../../src/repositories/fakes/UsersRepository";

let usersRepository;
let listProvidersService;

describe("ListProviders", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    listProvidersService = new ListProvidersService({
      usersRepository
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Show list all users expect the one that wants to list all providers", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const user = await usersRepository.create({
      name: "Jane Doe",
      email: "janedoe@email.com",
      password: "bigboobs420"
    });

    const users = await listProvidersService.execute({
      userId: user.id
    });

    expect(users).not.toContain(user);
  });
});
