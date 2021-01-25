import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import UserTokensRepository from "../../src/repositories/fakes/UserTokensRepository";
import ResetPasswordService from "../../src/services/ResetPasswordService";
import HashProvider from "../../src/utils/providers/HashProvider/fakes/HashProvider";
import AppError from "../../src/errors/AppError";

let usersRepository;
let userTokensRepository;
let resetPasswordService;
let hashProvider;

describe("ResetPassword", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    userTokensRepository = new UserTokensRepository();
    hashProvider = new HashProvider();

    resetPasswordService = new ResetPasswordService({
      usersRepository,
      userTokensRepository,
      hashProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
    userTokensRepository.userTokens.splice(
      0,
      userTokensRepository.userTokens.length
    );
  });

  test("Should receive a token and reset user's password", async () => {
    const generateHash = jest.spyOn(hashProvider, "generateHash");

    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const { token } = await userTokensRepository.create({ userId: user.id });

    const newPassword = "69420";

    await resetPasswordService.execute({
      token,
      password: newPassword
    });

    const updatedUser = await usersRepository.findById(user.id);

    const isPasswordUpdated = await hashProvider.compareHash(
      newPassword,
      updatedUser.password
    );

    expect(generateHash).toHaveBeenCalledWith(newPassword);
    expect(isPasswordUpdated).toBe(true);
  });

  test("Shouldn't reset the password of a non-existing user", async () => {
    expect.assertions(2);

    const id = Math.round(Math.random() * 1000000).toString();

    const { token } = await userTokensRepository.create({ userId: id });

    const newPassword = "69420";

    try {
      await resetPasswordService.execute({
        token,
        password: newPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe("User doesn't exist");
    }
  });

  test("Shouldn't reset the password with a non-existing token", async () => {
    expect.assertions(2);

    const token = Math.round(Math.random() * 1000000).toString();

    const newPassword = "69420";

    try {
      await resetPasswordService.execute({
        token,
        password: newPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe("User token doesn't exist");
    }
  });

  test("Shouldn't reset the password of a generated token after 2 hours", async () => {
    expect.assertions(1);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const { token } = await userTokensRepository.create({ userId: user.id });

    const newPassword = "69420";

    try {
      await resetPasswordService.execute({
        token,
        password: newPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
