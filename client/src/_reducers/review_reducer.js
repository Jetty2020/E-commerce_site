import {
  LOAD_REVIEW,
  ADD_REVIEW,
} from "../_actions/types";

export default function reviewReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_REVIEW:
      return { ...state, load_review: action.payload };
    case ADD_REVIEW:
      return { ...state, add_review: action.payload };
    default:
      return state;
  }
}
