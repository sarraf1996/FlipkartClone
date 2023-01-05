import { combineReducers, createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

//middleware
import thunk from 'redux-thunk';

//reducers
import { getUserDetailsReducer } from './reducers/userReducer';
import { getProductsReducer, getProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    getUserDetails: getUserDetailsReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;