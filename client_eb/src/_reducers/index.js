import { combineReducers } from 'redux';
import user from './user_reducer';
import product from './product_reducer';
import review from './review_reducer';
import QnA from './QnA_reducer';

const rootReducer = combineReducers({
    user,
    product,
    review,
    QnA,
});

export default rootReducer;