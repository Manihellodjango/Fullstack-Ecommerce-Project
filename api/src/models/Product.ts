import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
      maxlength: 150,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
export default Product;
