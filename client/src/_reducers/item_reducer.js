import {
  UPLOAD_ITEM
} from '../_actions/_types';
 
export default function itemReducer (state={},action){
  switch(action.type){
    case UPLOAD_ITEM:
      return {...state, upload: action.payload };
    default:
      return state;
  };
};