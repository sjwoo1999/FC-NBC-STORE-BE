import dotenv from "dotenv";
import express from "express";
import { connect } from "./schemas/index.js";
import router from "./routes/products.router.js";

// .env 파일 사용
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB 연결 URI 설정
const uri = process.env.MONGODB_URI;
connect(uri);

// 라우터 설정
app.use("/api", router);

app.listen(3000, () => {
  console.log("서버가 새로 띄워졌네요!");
});
