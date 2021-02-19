import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

// DB setting
const db = mysql.createConnection({
  host     : `${process.env.HOST}`,
  user     : `${process.env.MYSQL_USER}`,
  password : `${process.env.MYSQL_PASSWORD}`,
  database : `${process.env.DATABASE}`,
});

db.connect(function (err) {
  if (err) {
    console.error(`❌ Error on DB Connection:${err}`);
  } else {
    console.info("✅  Connected to DB");
  };
});

export default db;