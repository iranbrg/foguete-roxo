import SendEmailRecoveryPasswordService from "../../src/services/SendEmailRecoveryPasswordService";
import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import UserTokensRepository from "../../src/repositories/fakes/UserTokensRepository";
import EmailProvider from "../../src/utils/providers/EmailProvider/fakes/EmailProvider";
import AppError from "../../src/errors/AppError";

let usersRepository;
let emailProvider;
let userTokensRepository;
let sendEmailRecoveryPasswordService;

describe("SendEmailRecoveryPassword", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    emailProvider = new EmailProvider();
    userTokensRepository = new UserTokensRepository();

    sendEmailRecoveryPasswordService = new SendEmailRecoveryPasswordService({
      usersRepository,
      userTokensRepository,
      emailProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Should send a recovery password email to the user", async () => {
    const sendEmail = jest.spyOn(emailProvider, "sendEmail");

    await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const email = "jdoe@email.com";
    await sendEmailRecoveryPasswordService.execute({
      email
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  test("Shouldn't send a recovery password email to a non-existing user", async () => {
    expect.assertions(1);

    const email = "jdoe@email.com";

    try {
      await sendEmailRecoveryPasswordService.execute({
        email
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("Should generate a token of 'forgotten password' to the user", async () => {
    const create = jest.spyOn(userTokensRepository, "create");

    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    await sendEmailRecoveryPasswordService.execute({
      email: user.email
    });

    expect(create).toHaveBeenCalledWith({ userId: user.id });
  });
});
