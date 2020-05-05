import { combineReducers } from 'redux';
import UserReducer from '../store/user/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
});

export default rootReducer;