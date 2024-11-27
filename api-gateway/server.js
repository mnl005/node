import express from 'express';
import gatewayRoutes from './route/gatewayRoute.js';
import authRoute from './route/authRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// 미들웨어와 랜들러 간 데이터 교환시 항상 res.locals 로 정보 저장

// JSON 본문 파싱 미들웨어 추가
app.use(express.json());

//환경 변수 가져오기
dotenv.config({ path: '../.env' });

// ------------------------------------------------------------------------------------------------------
// 요 -> 라우터 -> LOG함수 실행 -> 로컬데이터초기화 -> 핸들러실행 -> 콘솔출력 -> 다음 미들웨어 호출 -> 응답
// 인
app.use((req, res, next) => {
    console.log("ininininin--------------------------------------------------------");
    next();
});

// Gateway Routes
app.use("/api",gatewayRoutes);
app.use("/auth",authRoute);

// 아웃
app.use((req, res, next) => {
    // 클라이언트에 전송
    res.status(200).json(res.locals);
    console.log("outoutoutoutout--------------------------------------------------------");
});

// ------------------------------------------------------------------------------------------------------





// 전역 에러 처리
app.use( (err, req, res, next) => {
    console.log("asdfasfasdfasfasd");
    res.status(200).json(res.locals);
});


app.listen(process.env.GATE_WAY_PORT,process.env.HOST,() => {
    console.log(`게이트웨이 시작 - ${process.env.HOST}:${process.env.GATE_WAY_PORT}`);
});
