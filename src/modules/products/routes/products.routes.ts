import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/", productsController.index);

// routes that need celebrate validation

// SHOW
productsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show
);

// CREATE
productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create
);

// UPDATE
productsRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update
);

// DELETE
productsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete
);

export default productsRouter;
