import container from "../container";

export default class ResetPasswordController {
  async create(req, res) {
    const { password, token } = req.body;

    const ResetPasswordService = container.resolve("resetPasswordService");

    await ResetPasswordService.execute({
      token,
      password
    });

    res.status(204).json();
  }
}
