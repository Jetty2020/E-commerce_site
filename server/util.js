import db from './db';
import nodemailer from 'nodemailer';
import { User } from './models';
import dotenv from 'dotenv';

dotenv.config();

export const generateRandom = function () {
  var ranNum = Math.floor(Math.random() * 1000000);
  return ranNum;
};

// 메일발송 객체
export const mailSender = {
  // 메일발송 함수
  sendGmail: function (email, subject, text) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      prot: 587,
      host: 'smtp.gmlail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: `${process.env.MAILID}`,
        pass: `${process.env.MAILPW}`,
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: `${process.env.MAILID}`,
      to: email, // 수신할 이메일
      subject, // 메일 제목
      text, // 메일 내용
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error occurred at mailSender');
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};
