import {
  UPLOAD_PRODUCT,
  SEARCH_PRODUCT,
  PRODUCT_DETAIL,
} from "../_actions/_types";

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_PRODUCT:
      return { ...state, upload: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, upload: action.payload };
    case PRODUCT_DETAIL:
      return { ...state, upload: action.payload };
    default:
      return state;
  }
}
