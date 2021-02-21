import db from "../db";

export const uploadItem = function (req, res) {
  // db.query(`INSERT INTO ITEM (userID, itemName, itemDes, fileURL) VALUES('${req.user[0].userID}', '${req.body.name}', '${req.body.description}', '${req.body.fileURL}');`, 
  db.query(`INSERT INTO ITEM (userID, itemName, itemDes) VALUES('${req.user[0].userID}', '${req.body.name}', '${req.body.description}');`, 
  function (err, item) {
    if (err) {
      console.log(err);
      return res.json({ 
        success: false, 
        message: "Error occurred at uploadItem"
      });
    };
    return res.status(200).json({
        success: true,
        itemID: item.insertId,
    });
  });
};