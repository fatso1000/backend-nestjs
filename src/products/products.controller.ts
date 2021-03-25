import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { CreateProductDTO } from "./dto/products.dto";

import { ProductsService } from "./products.service";

import {Roles} from "../auth/role/role.decorator"
import { JwtAuthGuard } from "../auth/authguards/jwt-auth.guard";
import { Role } from "../auth/role/role.enum";

// PRODUCTS ROUTES | /products
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // CREATE ROUTE | POST /products/create
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  async createPost(
    @Res() res: Response,
    @Body() createProductDTO: CreateProductDTO
  ) {
    const product = await this.productService.createProduct(createProductDTO);

    return res.status(HttpStatus.CREATED).json({
      message: "Product succesfully created!",
      statusCode: HttpStatus.CREATED,
      response: product,
    });
  }

  // LIST OF PRODUCTS | GET /products
  @Get("/")
  async getProducts(@Res() res: Response) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: "List of all products!",
      statusCode: HttpStatus.OK,
      response: products,
    });
  }

  @Get("/:productID")
  async getProduct(
    @Res() res: Response,
    @Param("productID") productID: string
  ) {
    const product = await this.productService.getProduct(productID);

    return res.status(HttpStatus.OK).json({
      message: "Product by ID",
      statusCode: HttpStatus.OK,
      response: product,
    });
  }

  @Delete("/delete")
  async deleteProduct(@Res() res: Response, @Query("productID") productID) {
    const product = await this.productService.deleteProduct(productID);
    return res.status(HttpStatus.OK).json({
      message: "Product deleted successfully!",
      statusCode: HttpStatus.OK,
      response: product,
    });
  }

  @Put("/update")
  async updateProduct(
    @Res() res: Response,
    @Query("productID") productID,
    @Body() createProductDTO: CreateProductDTO
  ) {
    const product = await this.productService.updateProduct(
      productID,
      createProductDTO
    );
    return res.status(HttpStatus.OK).json({
      message: "Product updated succesfully!",
      statusCode: HttpStatus.OK,
      response: product,
    });
  }
}
