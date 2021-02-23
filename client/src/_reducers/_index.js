import { combineReducers } from 'redux';
import user from './user_reducer';
import item from './item_reducer';

const rootReducer = combineReducers({
  user,
  item,
});

export default rootReducer;