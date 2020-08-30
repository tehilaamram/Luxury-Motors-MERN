import { combineReducers } from 'redux';
import UserReducer from '../redux/user/reducers';
import CartReducer from '../redux/Cart/reducers';
import FilterReducer from '../redux/chatFilter/reducers';
import CatalogFilterReducer from '../redux/catalogFilter/reducers';

const rootReducer = combineReducers({
    user: UserReducer,
    cart: CartReducer,
    filter: FilterReducer,
    catalogFilter: CatalogFilterReducer,
});

export default rootReducer;