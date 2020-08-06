import { combineReducers } from 'redux';
import UserReducer from '../redux/user/reducers';
import VehicleReducer from '../redux/vehicle/reducers';
import ChatReducer from '../redux/chat/reducers';
import CartReducer from '../redux/Cart/reducers';
import FilterReducer from '../redux/filter/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
    vehicle: VehicleReducer,
    chat: ChatReducer,
    cart: CartReducer,
    filter: FilterReducer,
});

export default rootReducer;