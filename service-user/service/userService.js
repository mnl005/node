import userRepository from "../repository/userRepository.js"

export const create_or_insert = async (req, res, next) => {
        const { email, name } = req.body;

        // 유저 찾기
        let user = await userRepository.getUserByEmail(email);
        // 유저가 없으면 생성
        if (!user) {
            user = await userRepository.createUser(email, name);
        }

        res.locals.res_body = {
            msg: `${user.name} 님의 정보를 불러왔습니다.`,
            user: user,
        };
};

export const update_user = async (req, res, next) => {
        const { email, name, phone, images } = req.body;

        // 요청 데이터 검증
        if (!email) {
            return res.status(400).json({ error: "이메일은 필수 항목입니다." });
        }

        // 유저 정보 업데이트
        const user = await userRepository.updateUserByEmail(email, name, phone, images);

        // 유저가 없을 경우 처리
        if (!user) {
            return res.status(404).json({ error: "업데이트할 사용자를 찾을 수 없습니다." });
        }

        res.locals.res_body = {
            msg: `${user.name} 님의 정보를 업데이트 했습니다.`,
            user: user,
        };
};


export const deleteUser = async (req, res, next) => {
        const { email } = req.body;

        // 요청 데이터 검증
        if (!email) {
            return res.status(400).json({ error: "이메일은 필수 항목입니다." });
        }

        // 유저 삭제
        const user = await userRepository.deleteUserByEmail(email);

        res.locals.res_body = {
            msg: "회원 탈퇴 완료"
        };
};