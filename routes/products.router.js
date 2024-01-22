import express from "express";

const router = express.Router();

// ---------------------------------------
// 상품 작성 API | POST : 새로운 데이터 생성

router.post("/create", async (req, res) => {
  // POST 요청을 처리하는 코드
  return res.json({ message: "POST 요청!" });
});

// app.use("/create", router);
// ---------------------------------------

// ---------------------------------------
// 상품 목록 조회 API | GET

router.get("/getList", async (req, res) => {
  // GET 요청을 처리하는 코드
  return res.json({ message: "GET 요청!" });
});

// ---------------------------------------

// 상품 상세 조회 API | GET=
router.get("/getDetail", async (req, res) => {
  // GET 요청을 처리하는 코드
  return res.json({ message: "GET 요청!" });
});
// ---------------------------------------

// 상품 정보 수정 API | PUT : 기존 데이터 수정
router.put("/edit", async (req, res) => {
  // PUT 요청을 처리하는 코드
  return res.json({ message: "PUT 요청!" });
});
// ---------------------------------------

// 상품 삭제 API | DELETE
router.delete("/delete", async (req, res) => {
  // DELETE 요청을 처리하는 코드
  return res.json({ message: "DELETE 요청!" });
});
// ---------------------------------------

export default router;
