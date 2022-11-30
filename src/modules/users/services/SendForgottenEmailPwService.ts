import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  email: string;
}

class SendForgottenEmailPwService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError("User not found!");

    const userToken = await userTokenRepository.generate(user.id);
    console.log(userToken); // simulates email sent
  }
}

export default SendForgottenEmailPwService;
