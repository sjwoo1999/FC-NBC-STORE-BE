import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 3000;

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
// body-parser 설정하기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router setting
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hi!" });
});

app.use("/api", [router, productsRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
