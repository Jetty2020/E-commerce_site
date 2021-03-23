import {
  LOAD_PRODUCT,
  UPLOAD_PRODUCT,
  EDIT_PRODUCT,
  SEARCH_PRODUCT,
  PRODUCT_DETAIL,
  DELETE_PRODUCT,
} from "../_actions/types";

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
      return { ...state, load: action.payload };
    case UPLOAD_PRODUCT:
      return { ...state, upload: action.payload };
    case EDIT_PRODUCT:
      return { ...state, edit: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, search: action.payload };
    case PRODUCT_DETAIL:
      return { ...state, detail: action.payload };
    case DELETE_PRODUCT:
      return { ...state, delete: action.payload };
    default:
      return state;
  }
}
