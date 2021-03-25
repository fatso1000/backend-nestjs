import { Schema } from "mongoose";

export const DOCUMENT_NAME = "Products";
export const COLLECTION_NAME = "products";

export const ProductSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    genre: {
      type: Schema.Types.Array,
      required: true
    },
    imageURL: {
      type: Schema.Types.String,
    },
    price: { type: Schema.Types.Number, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);
