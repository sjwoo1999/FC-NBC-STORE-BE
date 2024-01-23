// schemas/products.schema.js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["FOR_SALE", "SOLD_OUT"],
      default: "FOR_SALE",
    },
  },
  { timestamps: true },
);
// enum : 열거형

// 프론트엔드 서빙을 위한 코드입니다. 모르셔도 괜찮아요!
ProductSchema.virtual("productId").get(function () {
  return this._id.toHexString();
});
ProductSchema.set("toJSON", {
  virtuals: true,
});

// ProductSchema를 바탕으로 Product모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("Product", ProductSchema);
