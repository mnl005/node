import express from 'express';
import {LOG} from "../share/LOG.js";


const router = express.Router();


router.all('/test', LOG("authRoute-Test", "auth 테스트중 에러발생")(
        async (req, res) => {
            // 응답 예시
            res.locals.res_body["data1"] = "게이트웨이 테스트용 텍스트 입니다 - 1";
            res.locals.res_body["data2"] = "게이트웨이 테스트용 텍스트 입니다 - 2";
            res.locals.res_body["data3"] = "게이트웨이 테스트용 텍스트 입니다 - 3";
        }
    )
);


export default router;
