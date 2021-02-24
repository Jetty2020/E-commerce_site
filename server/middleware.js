import db from "./db";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import uuid from "uuid/v4";

export const auth = (req, res, next) => {
  //인증 처리를 하는곳 
  //클라이언트 쿠키에서 토큰을 가져온다.
  const token = req.cookies.w_auth;
  // 토큰을 복호화 한후  유저를 찾는다.
  db.query(`SELECT * from USER where token = '${token}';`, 
  function (err, user) {
    if (err) throw err;
    if (user.length == 0) {
      return res.json({
        isAuth: false,
        message: "Error occurred at auth",
        error: true
      });
    };
    req.token = token;
    req.user = user;
    next();
  });
};

export const localsMiddleware = (req, res, next) => {
  db.query(`SELECT * from USER where token = '${token}';`, 
  function (err, user) {
    res.locals.user = user || null;

  });
  next();
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});
 
var multerItem = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'handyhd',
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, req.s3Key)
    }
  })
})

const uploadItemMiddle = multerItem.single("file");

function uploadToS3(req, res) {
  // console.log(req);
  req.s3Key = uuid()
  let downloadUrl = `https://handyhd.s3.ap-northeast-2.amazonaws.com/${req.s3Key}`
  return new Promise((resolve, reject) => {
    return uploadItemMiddle(req, res, err => {
      if (err) return reject(err);
      return resolve(downloadUrl)
    })
  })
}

export const uploadFile = {
  uploadImageToS3: (req, res, next) => {
    uploadToS3(req, res)
      .then(downloadUrl => {
        // return res.status(200).send({downloadUrl})
        req.location = downloadUrl;
        next();
      })
      .catch(e => {
        console.log("uploadFile",e);
      })
  }
}