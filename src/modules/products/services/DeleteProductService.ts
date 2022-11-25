import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    // verify if product with this id exists and if doesn't, it throws an error
    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("product not found");

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
