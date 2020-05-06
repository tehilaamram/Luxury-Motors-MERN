import { combineReducers } from 'redux';
import UserReducer from '../redux/user/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
});

export default rootReducer;