// Admin

const ADMIN = "/admin";

// USER

const USERS = "/api/users";
const REGISTER = "/register";
const AUTH = "/auth";
const LOGIN = "/login";
const LOGOUT = "/logout";

// BOARDS with HOME

const HOME = "/";
const BOARDS = "/boards";
const UPLOAD_BOARD = "/upload";
const EDIT_BOARD = "/:id/edit";
const DELETE_BOARD = "/:id/delete";

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
  uploadBoard: UPLOAD_BOARD,
  editBoard: id => {
    if (id) {
      return `/boards/${id}/edit`;
    } else {
      return EDIT_BOARD;
    }
  },
  deleteBoard: id => {
    if (id) {
      return `/boards/${id}/delete`;
    } else {
      return DELETE_BOARD;
    }
  },

  api: API,
};

export default routes;