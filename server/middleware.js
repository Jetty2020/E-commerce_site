import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import uuid from "uuid/v4";
import { User } from "./models";

export const auth = async (req, res, next) => {
  //인증 처리를 하는곳 
  //클라이언트 쿠키에서 토큰을 가져온다.
  try {
    const token = req.cookies.w_auth;
    // 토큰을 복호화 한후  유저를 찾는다.
    const userState= await User.findOne({
      // attributes: ['id', 'role', 'userEmail', 'name'],
      where: {
        token
      },
    });
    if (userState) {
      const {
        dataValues: user
      } = userState;
      req.token = token;
      req.user = user;
      next();
    } else {
      return res.json({
        isAuth: false,
        message: "No user at auth",
        error: true
      });
    }
  }
  catch (err) {
    res.json({
      isAuth: false,
      message: "Error occurred at auth",
      error: true
    });
    throw err
  }
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});
 
let multerItem = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'handyhd',
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, uuid())
    }
  })
})

const imgMulter = multerItem.array("file",2);

function uploadToS3(req, res) {
  // console.log(req);
  return new Promise((resolve, reject) => {
    return imgMulter(req, res, err => {
      if (err) return reject(err);
      return resolve()
    })
  })
}

export const uploadFile = {
  uploadImageToS3: (req, res, next) => {
    uploadToS3(req, res)
      .then(downloadUrl => {
        next();
      })
      .catch(e => {
        console.log("uploadFile",e);
      })
  }
}