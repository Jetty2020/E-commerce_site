import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  EDIT_PASSWORD,
  EDIT_USER_SAND_MAIL,
  EDIT_USER_EMAIL,
  DELETE_USER,
  FIND_ID,
  FIND_PASSWORD,
  ADD_WISHLIST,
  ADD_CART,
  LOAD_CART,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function findID(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/findID`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: FIND_ID,
    payload: request,
  };
}

export function findPassword(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/findPassword`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: FIND_PASSWORD,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function editPassword(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/editPassword`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_PASSWORD,
    payload: request,
  };
}

export function editUserSendMail(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/editUserSendMail`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER_SAND_MAIL,
    payload: request,
  };
}

export function editUserEmail(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/editUserEmail`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: EDIT_USER_EMAIL,
    payload: request,
  };
}

export function deleteUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/deleteUser`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_USER,
    payload: request,
  };
}

export function addWishlist(id) {
  const request = axios
    .get(`${USER_SERVER}/addWishList/${id}`)
    .then((response) => response.data);

  return {
    type: ADD_WISHLIST,
    payload: request,
  };
}

export function addCart(id) {
  const request = axios
    .get(`${USER_SERVER}/addCart/${id}`)
    .then((response) => response.data);

  return {
    type: ADD_CART,
    payload: request,
  };
}

export function loadCart() {
  const request = axios
    .get(`${USER_SERVER}/loadCart`)
    .then((response) => response.data);
  return {
    type: LOAD_CART,
    payload: request,
  };
}

export function removeCartItem(id) {
  const request = axios
    .get(`/api/users/removeFromCart?_id=${id}`)
    .then((response) => {
      response.data.cart.forEach((item) => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then((response) => response.data);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request,
  };
}
