import express from "express";
import Product from "../schemas/products.schema.js";

const router = express.Router();

// ---------------------------------------
// 상품 작성 API | POST : 새로운 데이터 생성

// - 상품명, 작성 내용, 작성자명, 비밀번호를 request에서 전달 받기
// - 상품은 두 가지 상태, 판매 중(FOR_SALE) 및 판매 완료(SOLD_OUT)를 가질 수 있다.
// - 상품 등록 시 기본 상태는 판매 중(FOR_SALE)이다.

router.post("/create", async (req, res, next) => {
  // 1. 클라이언트로부터 받아온 value 데이터를 가져온다.
  // req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체입니다.
  const { title, content, author, password } = req.body;

  // 1-5. 만약, 클라이언트가 value 데이터를 전달하지 않았을 때, 클라이언트에게 에러 메시지를 전달한다.

  /*
  if (!title || !content || !author || !password) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  */

  if (!title) {
    return res.status(400).json({ errorMessage: "제목이 없습니다" });
  }

  if (!content) {
    return res.status(400).json({ errorMessage: "내용이 없습니다" });
  }

  if (!author) {
    return res.status(400).json({ errorMessage: "저자가 없습니다" });
  }

  if (!password) {
    return res.status(400).json({ errorMessage: "비밀번호가 없습니다" });
  }

  // 2. 해당하는 마지막 order 데이터를 조회한다.
  // findOne = 1개의 데이터만 존재한다.
  // sort = 정렬한다. -> 어떤 컬럼을?
  const productMaxOrder = await Product.findOne().sort("-order").exec();

  // 3. 만약 존재한다면 현재 해야 할 일을 +1 하고, order 데이터가 존재하지 않는다면, 1로 할당한다.
  const order = productMaxOrder ? productMaxOrder + 1 : 1;

  // 4. 해야할 일 등록
  const product = new Product({ value, order });
  await product.save();

  // 5. 해야할 일을 클라이언트에게 반환한다
  return res.status(201).json({ product });
});

// app.use("/create", router);
// ---------------------------------------

// ---------------------------------------
// 상품 목록 조회 API | GET

// - 상품명, 작성자명, 상품 상태, 작성 날짜 조회하기
// - 상품 목록은 작성 날짜를 기준으로 내림차순(최신순) 정렬하기

router.get("/getList", async (req, res, next) => {
  // GET 요청을 처리하는 코드
  return res.json({ message: "GET 요청!" });
});

// ---------------------------------------

// 상품 상세 조회 API | GET

// - 상품명, 작성 내용, 작성자명, 상품 상태, 작성 날짜 조회하기

router.get("/getDetail", async (req, res, next) => {
  // GET 요청을 처리하는 코드
  return res.json({ message: "GET 요청!" });
});
// ---------------------------------------

// 상품 정보 수정 API | PUT : 기존 데이터 수정

// - 상품명, 작성 내용, 상품 상태, 비밀번호를 request에서 전달받기
// - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 수정되게 하기
// - 선택한 상품이 존재하지 않을 경우, "상품 조회에 실패하였습니다." 메시지 반환하기

router.put("/edit", async (req, res, next) => {
  // PUT 요청을 처리하는 코드
  return res.json({ message: "PUT 요청!" });
});
// ---------------------------------------

// 상품 삭제 API | DELETE

// - 비밀번호를 request에서 전달받기
// - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 삭제되게 하기
// - 선택한 상품이 존재하지 않을 경우, "상품 조회에 실패하였습니다." 메시지 반환하기

router.delete("/delete", async (req, res) => {
  // DELETE 요청을 처리하는 코드
  return res.json({ message: "DELETE 요청!" });
});
// ---------------------------------------

export default router;
