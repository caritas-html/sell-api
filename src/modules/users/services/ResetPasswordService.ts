import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokensRepository";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

// service to reset the password with the token and password
interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError("user token doesn't exists");

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError("user doesn't exists");

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    // If date now is after (method), throw an error
    if (isAfter(Date.now(), compareDate)) throw new AppError("token expired");

    user.password = await hash(password, 8);

    await usersRepository.save(user);
    console.log(user);
  }
}

export default ResetPasswordService;
