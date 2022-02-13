import { orderReducer} from './order-state';
import { cartReducer} from './carts-state';
import { authReducer} from './auth-state';
import { itemReducer} from './items-state';
import { combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categories-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({
    categoriesState: categoriesReducer,
    productsState: productsReducer,
    itemsState: itemReducer,
    authState: authReducer,
    cartsState: cartReducer,
    orderState: orderReducer
});
const store = createStore(reducers);

export default store;