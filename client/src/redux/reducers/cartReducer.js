import * as actionTypes from "../constants/cartConstant";

//state contains current status of centralized repository or state
//action contains updated value which is received from api call

//cartItems = [ { id, _id, url, detailUrl, title, price, quantity, description, discount, tagline }, { etc... } ]
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            if(Array.isArray(action.payload)) {
                return { ...state, cartItems: action.payload };
            }
            else {
                const { item, exist } = action.payload;
                if(exist) {
                    return { ...state, cartItems: state.cartItems.map(product => product._id === item._id ? item : product) };
                }
                else {
                    return { ...state, cartItems: [ ...state.cartItems, item ] };
                }
            }
        case actionTypes.ADD_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG:
            return { ...state, isProductAddedAndNavigated: true };
        case actionTypes.REMOVE_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG:
            {
                const { isProductAddedAndNavigated: remove, ...newState } = state;
                return newState;
            }
        case actionTypes.REMOVE_FROM_CART:
            return { ...state, cartItems: state.cartItems.filter(product => product._id !== action.payload._id) };
        case actionTypes.UPDATE_CART:
            return { ...state, cartItems: state.cartItems.map(product => {
                    if(product._id === action.payload._id) {
                        return { ...product, quantity: action.payload.newQuantity };
                    }
                    return product;
                }),
                isCartModified: true
            }
        case actionTypes.REMOVE_IS_CART_MODIFIED_FLAG:
            {
                const { isCartModified: remove, ...newState } = state;
                return newState;
            }
        case actionTypes.TOTAL_CART_AMOUNT_TO_PAY:
            return { ...state, totalCartPriceToPay: action.payload.totalCartPriceToPay };
        case actionTypes.RESET_CART:
            {
                const { totalCartPriceToPay: remove, ...newState } = state;
                return { ...newState, cartItems: [] };
            }
        default:
            return state;
    }
}