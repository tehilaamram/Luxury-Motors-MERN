import { combineReducers } from 'redux';
import UserReducer from '../redux/user/reducers';
import VehicleReducer from '../redux/vehicle/reducers';
import ChatReducer from '../redux/chat/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
    vehicle: VehicleReducer,
    chat: ChatReducer,
});

export default rootReducer;