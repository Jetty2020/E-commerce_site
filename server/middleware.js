import db from "./db";

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