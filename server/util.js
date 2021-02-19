import jwt from "jsonwebtoken";
import moment from "moment";
import db from "./db";

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
