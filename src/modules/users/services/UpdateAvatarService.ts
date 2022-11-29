import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import { getCustomRepository } from "typeorm";

// Only if the user is authenticated, it will be used
interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateAvatarService {
  public async execute({ userId, avatarFilename }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User not found!");

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath); // return a promise with the status code of the path

      // unlink remove from filesystem the avatar photo
      if (userAvatarExists) await fs.promises.unlink(userAvatarFilePath);
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
