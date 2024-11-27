import express from 'express';
import userRoutes from './route/userRoute.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {decrypt, encrypt} from './share/AES.js';

// 환경변수
dotenv.config({path: '../.env'});

// express
const app = express();

// json 설정
app.use(express.json());

// ------------------------------------------------------------------------------------------------------
// 복호화 미들웨어
app.use( (req, res, next) => {
    console.log("ininininininin-----------------------------------");
    req.body = decrypt(req.body);
    next();
});

// User Routes
app.use('/api/user', userRoutes);

// 암호화 미들웨어
app.use((req, res, next) => {
    res.locals = encrypt(res.locals);
    res.status(200).json(res.locals);
    console.log("outoutoutoutoutout-----------------------------------");
});

// ------------------------------------------------------------------------------------------------------


app.use((err, req, res, next) => {
    res.status(200).json(res.locals);
});

// MongoDB 연결 함수
const connect_MongoDB = async () => {
    try {
        await mongoose.connect(process.env.USER_DB_URL);
        console.log('MongoDB 연결 성공:  ', process.env.USER_DB_URL);
    } catch (err) {
        console.error('MongoDB 연결 실패 : ', err.message);
        process.exit(1);
    }
};

await connect_MongoDB();

app.listen(process.env.USER_SERVER_PORT, process.env.HOST, () => {
    console.log(`유저 서비스 시작 - ${process.env.HOST}:${process.env.USER_SERVER_PORT}`);
});



