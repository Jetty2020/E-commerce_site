const USERS = "/api/users";
const PRODUCTS = "/api/products";
// Admin

const ADMIN = "/admin";

// USER

const REGISTER = "/register";
const AUTH = "/auth";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CHECK_EMAIL = "/checkEmail";
const FIND_ID = "/findID";
const FIND_PASSWORD = "/findPassword";
const EDIT_PASSWORD = "/editPassword";
const EDIT_USER_SEND_MAIL = "/editUserSendMail";
const EDIT_USER_EMAIL = "/editUserEmail";
const DELETE_USER = "/deleteUser";
const EDIT_USER = "/edit";

const ADD_CART = "/addCart/:productId";
const LOAD_CART = "/loadCart";
const REMOVE_CART = "/removeCart/:productId";

const ADD_WISHLIST = "/addWishList/:productId";
const LOAD_WISHLIST = "/loadWishList";
const REMOVE_WISHLIST = "/removeWishList/:productId";



const LOAD_REVIEW = "/loadReview/:productId";
const ADD_REVIEW = "/addReview/:id";
const EDIT_REVIEW = "/editReview/:id";
const REMOVE_REVIEW = "/removeReview/:id";

const LOAD_QNA = "/loadQnA/:productId";
const ADD_QNA = "/addQnA/:id";
const EDIT_QNA = "/editQnA/:id";
const REMOVE_QNA = "/removeQnA/:id";

// PRODUCTS with HOME

const HOME = "/";
const LOAD_PRODUCT = "/load/:sector";
const UPLOAD_PRODUCT = "/upload";
const EDIT_PRODUCT = "/edit";
const SEARCH_PRODUCT = "/search";
const PRODUCT_DETAIL = "/productDetail";
const DETAIL_PRODUCT = "/detail";
const DELETE_PRODUCT = "/delete/:productID";

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

  users: USERS,
  register: REGISTER,
  auth: AUTH,
  login: LOGIN,
  checkEmail: CHECK_EMAIL,
  editPassword: EDIT_PASSWORD,
  editUserSendMail: EDIT_USER_SEND_MAIL,
  editUserEmail: EDIT_USER_EMAIL,
  deleteUser: DELETE_USER,
  findID: FIND_ID,
  findPassword: FIND_PASSWORD,
  logout: LOGOUT,
  editUser: EDIT_USER,

  addCart: ADD_CART,
  loadCart: LOAD_CART,
  removeCart: REMOVE_CART,

  addWishList: ADD_WISHLIST,
  loadWishList: LOAD_WISHLIST,
  removeWishList: REMOVE_WISHLIST,

  // PRODUCTS

  products: PRODUCTS,
  loadProduct: LOAD_PRODUCT,
  searchProduct: SEARCH_PRODUCT,
  productDetail: PRODUCT_DETAIL,
  uploadProduct: UPLOAD_PRODUCT,
  editProduct: EDIT_PRODUCT,
  detailProduct: DETAIL_PRODUCT,
  deleteProduct: DELETE_PRODUCT,

  loadReview: LOAD_REVIEW,
  addReview: ADD_REVIEW,
  editReview: EDIT_REVIEW,
  removeReview: REMOVE_REVIEW,

  loadQnA: LOAD_QNA,
  addQnA: ADD_QNA,
  editQnA: EDIT_QNA,
  removeQnA: REMOVE_QNA,

  //SNS_LOGINS
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
};

export default routes;
