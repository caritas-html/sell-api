import { Request, Response } from "express";
import UpdateAvatarService from "../services/UpdateAvatarService";

class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarService();

    const user = updateAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename as string,
    });
    return response.json(user);
  }
}

export default AvatarController;
