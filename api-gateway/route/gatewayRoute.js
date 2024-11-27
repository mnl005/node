import express from 'express';
import axios from 'axios';
import {LOG} from "../share/LOG.js";
import { encrypt, decrypt } from '../share/AES.js';


const router = express.Router();


router.all('/test', LOG("GateWay-Test", "게이트웨이 테스트중 에러발생")(
        async (req, res) => {
            // 응답 예시
            res.locals.res_body["data1"] = "게이트웨이 테스트용 텍스트 입니다 - 1";
            res.locals.res_body["data2"] = "게이트웨이 테스트용 텍스트 입니다 - 2";
            res.locals.res_body["data3"] = "게이트웨이 테스트용 텍스트 입니다 - 3";
        }
    )
);


// 유저 서비스 라우팅
router.all('/user/*', LOG("GateWay_User", "유저 서비스 에러")(
        async (req, res) => {

            // 유저 서비스에 요청
            const response = await axios({
                method: req.method,
                url: `${process.env.PROTOCOL}${process.env.HOST}:${process.env.USER_SERVER_PORT}${req.originalUrl}`,
                data: encrypt(req.body),
            });

            // 응답 저장
            res.locals.res_body[req.originalUrl] = decrypt(response.data);
        }
    )
);

// Route to Order Service
// router.all('/orders/*', async (req, res) => {
//     try {
//         const response = await axios({
//             method: req.method,
//             url: `http://localhost:8002${req.originalUrl}`,
//             data: req.body,
//         });
//         res.status(response.status).json(response.data);
//     } catch (err) {
//         res.status(err.response?.status || 500).json(err.response?.data || {error: 'Service unavailable'});
//     }
// });


export default router;
