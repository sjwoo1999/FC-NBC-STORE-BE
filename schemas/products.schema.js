// schemas/products.schema.js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  // data
  //   - id
  //   - status
  //   - createdAt

  id: {
    type: String,
    required: false, // id 필드는 필수 요소가 아닙니다.
  },
  title: {
    type: String,
    required: true, // title 필드는 필수 요소입니다.
  },
  content: {
    type: String,
    required: true, // content 필드는 필수 요소입니다.
  },
  author: {
    type: String,
    required: true, // author 필드는 필수 요소입니다.
  },
  status: {
    type: String,
    required: false, // status 필드는 필수 요소가 아닙니다.
  },
  password: {
    type: String,
    required: true, // password 필드는 필수 요소입니다.
  },
});

// 프론트엔드 서빙을 위한 코드입니다. 모르셔도 괜찮아요!
ProductSchema.virtual("productId").get(function () {
  return this._id.toHexString();
});
ProductSchema.set("toJSON", {
  virtuals: true,
});

// ProductSchema를 바탕으로 Product모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("Product", ProductSchema);
