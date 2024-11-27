import dotenv from 'dotenv';

import AWS from 'aws-sdk';
dotenv.config();
dotenv.config({ path: '../../.env' });


// AWS SES 설정
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_ACCESS_REGION,
});

// SES 클라이언트 생성
const ses = new AWS.SES();

async function sendEmail(senderEmail, subject, body) {
    const params = {
        Source: senderEmail, // 발신자 이메일 주소
        Destination: {
            ToAddresses: ['mnl005@naver.com'], // 수신자 이메일 주소
        },
        Message: {
            Subject: {
                Data: subject, // 이메일 제목
            },
            Body: {
                Text: {
                    Data: body, // 이메일 내용
                },
            },
        },
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log("Email sent successfully!", data);
    } catch (error) {
        console.error("Email sending failed:", error.message);
    }
}

sendEmail("mnl005@naver.com","ㅂㅈㄷㄱ","내용....");

