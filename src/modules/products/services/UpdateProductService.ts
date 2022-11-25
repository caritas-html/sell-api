import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // verify if product with this id exists and if doesn't, it throws an error
    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("product not found");

    // verify if product with this name already exists
    const productExists = await productsRepository.findByName(name);
    if (productExists && name !== product.name)
      throw new AppError("There is already a product with this name");

    // update the product name and return the updated product
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
