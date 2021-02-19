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

db.connect();

db.query(`SELECT * FROM user`, function(error,user){
  if(error){
    console.log(`❌ Error on DB Connection:${error}`);
  } else {
    console.log("✅  Connected to DB");
  };
});