import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Products } from "./interfaces/products.interface";
import { CreateProductDTO } from "./dto/products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("Products") private readonly productModel: Model<Products>
  ) {}

  async getProducts(): Promise<Products[]> {
    const products = await this.productModel.find({});
    return products;
  }

  getProduct(productID: string): Promise<Products> {
    const product = this.productModel.findById(productID).catch((e) => {
      throw new NotFoundException("Product doesn't exists!");
    });
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Products> {
    const newProduct = new this.productModel(createProductDTO);
    return await newProduct.save();
  }

  updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO
  ): Promise<Products> {
    const updatedProduct = this.productModel
      .findByIdAndUpdate(productID, createProductDTO, { new: true })
      .catch((e) => {
        throw new NotFoundException("Product doesn't exists!");
      });
    return updatedProduct;
  }

  deleteProduct(productID: string): Promise<Products> {
    const deletedProduct = this.productModel
      .findByIdAndDelete(productID)
      .catch((e) => {
        throw new NotFoundException("Product doesn't exists!");
      });
    return deletedProduct;
  }
}
