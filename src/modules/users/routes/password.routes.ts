import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ForgottenPasswordController from "../controllers/ForgottenPasswordController";

const passwordRouter = Router();
const forgottenPasswordController = new ForgottenPasswordController();

passwordRouter.post(
  "/forgotten",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgottenPasswordController.create
);

export default passwordRouter;
