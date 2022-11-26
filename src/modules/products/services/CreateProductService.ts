import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

// data's request interface
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // verify if product with this name already exists
    const productExists = await productsRepository.findByName(name);
    if (productExists)
      throw new AppError("There is already a product with this name");

    // create method to create the object to be send to database
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    // send the object product to db and return product
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
