import mongoose from "mongoose";

require("dotenv").config(); // .env 파일에서 환경변수 불러오기

const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "node_lv1", // node_lv1 데이터베이스명을 사용합니다.
    })
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
