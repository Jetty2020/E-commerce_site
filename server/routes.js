const USERS = "/api/users";
const ITEMS = "/api/items";
// Admin

const ADMIN = "/admin";

// USER

const REGISTER = "/register";
const AUTH = "/auth";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CHECKEMAIL = "/checkEmail";

// ITEMS with HOME

const HOME = "/";
const LOAD_ITEM = "/load";
const UPLOAD_ITEM = "/upload";
const EDIT_ITEM = "/edit";
const SEARCH_ITEM = "/search";
const DETAIL_ITEM = "/detail";
const DELETE_ITEM = "/delete";

// API
const API = "/api";

// Kakao

const KAKAO = "/oauth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";
const NAVER = "/oauth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";
const GOOGLE = "/oauth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";


const routes = {
  
  home: HOME,
  
  //ADMIN
  
  admin: ADMIN,

  // USER

  register: REGISTER,
  auth: AUTH,
  login: LOGIN,
  checkEmail: CHECKEMAIL,
  logout: LOGOUT,
  users: USERS,

  // ITEMS

  items: ITEMS,
  loadItem: LOAD_ITEM,
  searchItem: SEARCH_ITEM,
  uploadItem: UPLOAD_ITEM,
  editItem: EDIT_ITEM,
  detailItem: DETAIL_ITEM,
  deleteItem: DELETE_ITEM,

  api: API,

  //SNS_LOGINS
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,

};

export default routes;