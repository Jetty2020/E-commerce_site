import jwt from "jsonwebtoken";
import moment from "moment";
import db from "./db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (user, cb) => {
	try {
		var token =  jwt.sign(user[0].userID,'secret')
		var halfHour = moment().add(0.5, 'hour').valueOf();
		db.query(`UPDATE USER SET token = '${token}', tokenExp = '${halfHour}' WHERE userID = '${user[0].userID}';`);
		cb(null, user);
	} catch(e) {
		return cb(err)
	};
};

export const generateRandom = function () {
	var ranNum = Math.floor(Math.random()*1000000);
	return ranNum;
};

// 메일발송 객체
export const mailSender = {
	// 메일발송 함수
	sendGmail : function(req){
		var transporter = nodemailer.createTransport({
			service: 'gmail'
			,prot : 587
			,host :'smtp.gmlail.com'
			,secure : false
			,requireTLS : true
			, auth: {
				user: `${process.env.MAILID}`,
				pass: `${process.env.MAILPW}`
			}
		});
		// 메일 옵션
		const hash = generateRandom(111111,999999);
		const email = req.body.email;
		var mailOptions = {
				from: `${process.env.MAILID}`,
				to: email, // 수신할 이메일
				subject: '회원가입을 위한 인증번호를 입력해주세요.', // 메일 제목
				text: "오른쪽 숫자 6자리를 입력해주세요 : " + hash // 메일 내용
		};
		// 메일 발송    
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				db.query(`UPDATE USER SET emailHash = '${hash}' WHERE userEmail = '${email}';`);
				console.log('Email sent: ' + info.response);
			}
		});
	}
};



// export const sendEmail = async(req, res) => {
//   const number = generateRandom(111111,999999);
//   const email = req.body.email;
//   console.log(email);

//   const mailOptions = await smtpTransport.sendMail({
//     from: `곰방`,
//     to: email,
//     subject: '회원가입을 위한 인증번호를 입력해주세요.',
//     text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
//   });

//   smtpTransport.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(info);
//     console.log("Finish sending email : " + info.response);
//     res.send(number);
//     smtpTransport.close();
//   });
// };