import { combineReducers } from 'redux';
import UserReducer from '../redux/user/reducers';
import VehicleReducer from '../redux/vehicle/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
    vehicle: VehicleReducer,
});

export default rootReducer;