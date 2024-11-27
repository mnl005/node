import crypto from 'crypto';

// 암호화 함수
export const encrypt = (data) => {
    const ALGORITHM = 'aes-256-cbc';
    const SECRET_KEY = Buffer.from(`${process.env.AES_KEY}`.padEnd(32, '_'), 'utf8'); // 패딩하여 32바이트로 확장
    const IV = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex'); // JSON 문자열로 변환 후 암호화
    encrypted += cipher.final('hex');
    return { iv: IV.toString('hex'), data: encrypted };
};

// 복호화 함수
export const decrypt = (encrypted) => {
    const ALGORITHM = 'aes-256-cbc';
    const SECRET_KEY = Buffer.from(`${process.env.AES_KEY}`.padEnd(32, '_'), 'utf8'); // 패딩하여 32바이트로 확장
    const IV = crypto.randomBytes(16);

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        SECRET_KEY,
        Buffer.from(encrypted.iv, 'hex')
    );
    let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted); // JSON 문자열 복호화 후 객체로 변환
};

// JSON 데이터 사용 예시
// const jsonData = {
//     "info": {
//         "status": "안녕?",
//         "url": "/user/me",
//         "type": "POST",
//         "host": "localhost",
//         "service": "GateWay_User",
//         "err_msg": "no err_msg"
//     },
// };
// console.log("Original JSON Data:", jsonData);
// const encryptedJson = encrypt(jsonData);
// console.log("Encrypted JSON:", encryptedJson);
//
// const decryptedJson = decrypt(encryptedJson);
// console.log("decryptedJson22:", decryptedJson);

