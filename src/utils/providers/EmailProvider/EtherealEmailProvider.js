import nodemailer from "nodemailer";

export default class EtherealEmailProvider {
  constructor({ emailTemplateProvider }) {
    this.emailTemplateProvider = emailTemplateProvider;

    this.init = this.init.bind(this);
    this.init();
  }

  // constructor({ emailTemplateProvider }) {
  //   this.emailTemplateProvider = emailTemplateProvider;
  //   nodemailer.createTestAccount().then(account => {
  //     const transporter = nodemailer.createTransport({
  //       host: account.smtp.host,
  //       port: account.smtp.port,
  //       secure: account.smtp.secure,
  //       auth: {
  //         user: account.user,
  //         pass: account.pass
  //       }
  //     });

  //     this.client = transporter;
  //   });
  // }

  init() {
    (async () => {
      const account = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    })();
  }

  async sendEmail({ to, from, subject, templateData }) {
    const message = await this.client.sendMail({
      from: {
        name: from.name || "Equipe Singular",
        address: from.email || "equipe@singular.com.br"
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.emailTemplateProvider.parse(templateData)
    });

    console.log(`==> Message sent: ${message.messageId}`);
    console.log(`==> Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
