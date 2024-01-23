import express from "express";
import Product from "../schemas/products.schema.js";
const router = express.Router();

// 상품 작성 (POST)
router.post("/products", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    // TODO: title ~ password까지 전부 꼼꼼하게 유효성 검사를 할 것!
    const { title, content, author, password } = req.body; // JSON

    const newProduct = new Product({
      title, // == title: title
      content,
      author,
      password,
      // status: "FOR_SALE",
    });

    await newProduct.save();

    res.status(201).json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
    // TODO : 에러를 로깅해야 됩니다!
  }
});

// 상품 목록 조회 (GET)

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .select("_id title author status createdAt")
      .sort({ createdAt: -1 }); // createdAt이라는 값을 기준으로 내림차순으로 정렬을 하겠다.
    // -는 reverse, 배제의 의미가 있겠다 .. 라고 생각해주시면 된다.
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
    // TODO : 에러를 로깅해야 됩니다!
  }
});

// 상품 상세 조회 (GET)

router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "_id title content author status createdAt",
    ); // createdAt이라는 값을 기준으로 내림차순으로 정렬을 하겠다.
    // -는 reverse, 배제의 의미가 있겠다 .. 라고 생각해주시면 된다.

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
    // TODO : 에러를 로깅해야 됩니다!
  }
});

// 상품 수정 (PUT)

router.put("/products/:productId", async (req, res) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    // TODO: title ~ status까지 전부 꼼꼼하게 유효성 검사를 할 것!
    const { title, content, password, status } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    if (password !== product.password) {
      return res
        .status(401)
        .json({ message: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    product.title = title;
    product.content = content;
    product.status = status;

    await product.save();
    res.json({ message: "상품 정보를 수정하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
    // TODO : 에러를 로깅해야 됩니다!
  }
});

// 상품 삭제 (DELETE)

router.delete("/products/:productId", async (req, res) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const { password } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    if (password !== product.password) {
      return res
        .status(401)
        .json({ message: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    await product.deleteOne({ product });

    res.json({ message: "상품을 삭제하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
    // TODO : 에러를 로깅해야 됩니다!
  }
});

export default router;
