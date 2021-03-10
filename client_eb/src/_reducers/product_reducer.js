import {
  UPLOAD_PRODUCT
} from '../_actions/_types';
 
export default function productReducer (state={},action){
  switch(action.type){
    case UPLOAD_PRODUCT:
      return {...state, upload: action.payload };
    default:
      return state;
  };
};