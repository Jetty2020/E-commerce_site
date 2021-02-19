var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12341234',
  database : 'TUTORIAL'
});
 
connection.connect();
 
connection.query('select * from user', function (error, results, fields) {
  if (error) throw error;
  console.log(results[1].userID);
});
 
connection.end();