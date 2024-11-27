import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    images: {type: String, default: ''},
    phone: {type: String, default: ''},
    friends: [{type: String, ref: 'User'}]
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.$__; // $__ 제거
            delete ret._doc; // _doc 제거
            delete ret.__v; // 버전 키 제거
            return ret;
        },
    },
});

const User = mongoose.model('User', userSchema);

class userRepository {


    // create: email을 기준으로 사용자 생성
    async createUser(email, name) {
        const user = new User();
        user.email = email;
        user.name = name;
        return await user.save();
    }


    // Read: email을 기준으로 사용자 조회
    async getUserByEmail(email) {
        const user = await User.findOne({email}); // 이메일로 유저 검색
        if (!user) {
            return null; // 유저가 없으면 null 반환
        }
        return user;
    }

    // Update: email을 기준으로 사용자 정보 업데이트
    async updateUserByEmail(email, name, phone, images) {

        // 업데이트할 필드를 동적으로 설정
        const updateFields = {
            name,
            phone,
        };

        // images가 빈 문자열이 아니고 유효한 경우에만 추가
        if (images && typeof images === 'string' && images.trim() !== '') {
            updateFields.images = images;
        }

        // 업데이트
        return User.findOneAndUpdate(
            {email}, // 조건: 이메일로 사용자 검색
            {$set: updateFields}, // 업데이트할 필드만 설정
            {new: true, runValidators: true} // 업데이트 후 결과 반환, 유효성 검사
        );
    }


    // Delete: email을 기준으로 사용자 삭제
    async deleteUserByEmail(email) {

        return User.findOneAndDelete(
            {email},
            {lean: true}
        );
    }

}


export default new userRepository();
