import {
  LOGIN_USER,
  KKO_LOGIN,
  REGISTER_USER,
  AUTH_USER,
  FIND_ID,
  FIND_PASSWORD,
  LOGOUT_USER,
  EDIT_PASSWORD,
  EDIT_USER_SAND_MAIL,
  EDIT_USER_EMAIL,
  DELETE_USER,
  ADD_WISHLIST,
  LOAD_WISHLIST,
  REMOVE_WISHLIST,
  ADD_CART,
  LOAD_CART,
  REMOVE_CART,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
} from '../_actions/types';

const init = {
  userData: null,
};

export default function userReducer(state = init, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case KKO_LOGIN:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case FIND_ID:
      return { ...state, findId: action.payload };
    case FIND_PASSWORD:
      return { ...state, findPassword: action.payload };
    case LOGOUT_USER:
      return { ...state, logout: action.payload };
    case EDIT_PASSWORD:
      return { ...state, editPassword: action.payload };
    case EDIT_USER_SAND_MAIL:
      return { ...state, editUserSendMail: action.payload };
    case EDIT_USER_EMAIL:
      return { ...state, editUserEmail: action.payload };
    case DELETE_USER:
      return { ...state, deleteUser: action.payload };
    case ADD_WISHLIST:
      return { ...state, addWishlist: action.payload };
    case LOAD_WISHLIST:
      return { ...state, loadWishlist: action.payload };
    case REMOVE_WISHLIST:
      return { ...state, removeWishlist: action.payload };
    case ADD_CART:
      return { ...state, addCart: action.payload };
    case LOAD_CART:
      return { ...state, loadCart: action.payload };
    case REMOVE_CART:
      return { ...state, removeCart: action.payload };

    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
        cartDetail: action.payload.cartDetail,
      };

    default:
      return state;
  }
}
