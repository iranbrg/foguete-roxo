import path from "path";
import AppError from "../errors/AppError";

export default class SendEmailRecoveryPasswordService {
  constructor({ usersRepository, userTokensRepository, emailProvider }) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.emailProvider = emailProvider;
  }

  async execute({ email }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User desn't exist", 401);
    }

    const { token } = await this.userTokensRepository.create({
      userId: user.id
    });

    const recoveryPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      // "emailRecoveryPasswordTemplate.hbs"
      "test.mjml"
    );

    await this.emailProvider.sendEmail({
      from: {},
      to: { name: user.name, email: user.email },
      subject: "[Singular] Recuperação de senha",
      templateData: {
        template: recoveryPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token}`
        }
      }
    });
  }
}
