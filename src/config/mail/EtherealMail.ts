import nodemailer from "nodemailer";

interface IMailContact {
  name: string;
  email: string;
}

interface ISendEmail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  body: string;
}

class EtherealMail {
  static async sendMail({ to, body }: ISendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: "admin@sellapi.com",
      to,
      subject: "Password Recovering",
      text: body,
    });

    console.log("message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;
