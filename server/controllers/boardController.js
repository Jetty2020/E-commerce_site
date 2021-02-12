import User from "../models/User";
import Board from "../models/Board";
import moment from "moment-timezone";

// upload
export const uploadBoard = async (req, res) => {
  try {
    const day =  moment().tz("Asia/Seoul").format('YYYY/MM/DD HH:mm:ss');
    // console.log(day);
    const {
      body: { title, description },
      // file: { path }
    } = req;
    const newBoard = await Board.create({
      title,
      description,
      createdAt: day,
      // fileUrl: path,
      creator: req.user._id,

    });
    req.user.boards.push(newBoard._id);
    req.user.save();
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log("uploadBoard");
    console.log(error);
    return res.json({ success: false, message: "Error occurred"});
  };
};
// edit
export const editBoard = async (req, res) => {
  const {
    // params: { id },
    body: { id, title, description }
  } = req;
  try {
    const board = await Board.findById(id);
    if(String(board.creator._id) == String(req.user._id)) {
      await board.update({ title, description });
      return res.status(200).json({
        success: true,
        id
      });
    } else {
      return res.json({ success: false, message: "You do not have permission"});
    }
  } catch (error) {
    console.log("postEditBoard");
    console.log(error);
    return res.json({ success: false, message: "Error occurred"});
  }
};

// show
export const showBoard = async (req, res) => {
  try {
    const board = await Board.find({}).sort({ _id: -1 });
    let boardId =[];
    board.forEach(ele => boardId.push(ele.id));
    return res.status(200).json({
      success: true,
      id: boardId
    });
  } catch (error) {
    console.log("showBoard");
    console.log(error);
    return res.json({ success: false, message: "Error occurred"});
  }
};

// detail
export const detailBoard = async (req, res) => {
  const {
    body: { id }
  } = req;
try {
  const board = await Board.findById(id);
  return res.status(200).json({
    success: true,
    _id: board._id,
    title: board.title,
    description: board.description,
    createdAt: board.createdAt,
    creator: board.creator,
    
});
} catch (error) {
  console.log(error);
  return res.json({ success: false, message: "Error occurred"});
}
};

// search
export const searchBoard = async (req, res) => {
  const {
    body: { term: searchingBy }
  } = req;
  let board = [];
try {
  board = await Board.find({
    title: { $regex: searchingBy, $options: "i" }
  });
  let boardTitle =[];
  board.forEach(ele => boardTitle.push(ele.title));
  return res.status(200).json({
    success: true,
    title: boardTitle,
});
} catch (error) {
  console.log(error);
  return res.json({ success: false, message: "Error occurred"});
}
};

// delete
export const deleteBoard = async (req, res) => {
  const {
    body: { id }
  } = req;
  try {
    const board = await Board.findById(id);
    if(board == null) {
      return res.json({ success: false, message: "The article does not exist." });
    }
    if(String(board.creator._id) !== String(req.user._id)) {
      throw Error();
    } else {
      await Board.findOneAndRemove({ _id: id });
      console.log(board);
      return res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error occurred" });
  }
};