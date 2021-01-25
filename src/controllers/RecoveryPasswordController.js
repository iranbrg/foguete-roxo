import container from "../container";

export default class RecoveryPasswordController {
  async create(req, res) {
    const { email } = req.body;

    const sendEmailRecoveryPasswordService = container.resolve(
      "sendEmailRecoveryPasswordService"
    );

    await sendEmailRecoveryPasswordService.execute({
      email
    });

    res.status(204).json();
  }
}
