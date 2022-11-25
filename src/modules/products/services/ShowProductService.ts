import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: number;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // verify if product with this id exists and if doesn't, it throws an error
    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("product not found");

    // else return product
    return product;
  }
}

export default ShowProductService;
