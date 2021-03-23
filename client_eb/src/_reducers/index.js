import { combineReducers } from 'redux';
import user from './user_reducer';
import product from './product_reducer';
import review from './review_reducer';

const rootReducer = combineReducers({
    user,
    product,
    review
});

export default rootReducer;