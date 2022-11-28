import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import AvatarController from "../controllers/AvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, usersController.index);

// routes that need celebrate validation

// CREATE
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

// UPDATE (avatar)
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  avatarController.update
);

export default usersRouter;
