import { Request, Response } from "express";
import SendForgottenEmailPwService from "../services/SendForgottenEmailPwService";

class ForgottenPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgottenEmailPw = new SendForgottenEmailPwService();

    await sendForgottenEmailPw.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgottenPasswordController;
