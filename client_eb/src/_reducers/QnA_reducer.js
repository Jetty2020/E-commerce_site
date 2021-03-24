import {
  LOAD_QNA,
  ADD_QNA,
} from "../_actions/types";

export default function QnAReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_QNA:
      return { ...state, load_QnA: action.payload };
    case ADD_QNA:
      return { ...state, add_QnA: action.payload };
    default:
      return state;
  }
}
