import express from 'express';
import {LOG} from "../share/LOG.js";
import {create_or_insert, deleteUser, update_user} from "../service/userService.js";

const router = express.Router();

router.all('/test', LOG("UserRoute_Test", "유저 서버 오류")(
        async (req, res, next) => {
            res.locals.res_body["data1"] = "UserRoute_Test 상태 정상입니다";
        }
    )
);

// 유저 생성 및 조회
router.all('/me', LOG("UserServer-select,insert","유저 생성 실패")(create_or_insert));

// 유저 업데이트
router.all('/update', LOG("UserServer-update", "유저 업데이트 실패")(update_user));

// 유저 삭제
router.all('/delete', LOG("UserServer-delete"," 유저 삭제 실패")(deleteUser));

export default router;
