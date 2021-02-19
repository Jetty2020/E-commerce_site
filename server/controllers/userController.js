import db from "../db";

export const register = async (req, res) => {
  db.query(`INSERT INTO USER (userEmail, userPassword) VALUES('${res.email}', '${res.password}');`, function (error, results) {
    if (error) {
      console.log(error);
      return res.json({ 
        success: false, 
        message: "Error occurred at register"
      });
    };
    return res.status(200).json({
        success: true
    });
  });
};