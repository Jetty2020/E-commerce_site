const USERS = "/api/users";
const BOARDS = "/api/boards";
// Admin

const ADMIN = "/admin";

// USER

const REGISTER = "/register";
const AUTH = "/auth";
const LOGIN = "/login";
const LOGOUT = "/logout";

// BOARDS with HOME

const HOME = "/";
const LOAD_BOARD = "/load";
const UPLOAD_BOARD = "/upload";
const EDIT_BOARD = "/edit";
const SEARCH_BOARD = "/search";
const DETAIL_BOARD = "/detail";
const DELETE_BOARD = "/delete";

// API
const API = "/api";


const routes = {
  
  //ADMIN
  
  admin: ADMIN,

  // USER

  register: REGISTER,
  auth: AUTH,
  login: LOGIN,
  logout: LOGOUT,
  users: USERS,

  // BOARDS with HOME

  home: HOME,
  boards: BOARDS,
  loadBoard: LOAD_BOARD,
  searchBoard: SEARCH_BOARD,
  uploadBoard: UPLOAD_BOARD,
  editBoard: EDIT_BOARD,
  detailBoard: DETAIL_BOARD,
  deleteBoard: DELETE_BOARD,

  api: API,
};

export default routes;