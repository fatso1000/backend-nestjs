import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ProductSchema,
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "./schema/products.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DOCUMENT_NAME,
        schema: ProductSchema,
        collection: COLLECTION_NAME,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
