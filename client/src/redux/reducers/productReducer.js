import * as actionTypes from '../constants/productConstant';

//passing empty array to productPayload attribute of state object to stop error while rendering UI components
//state contains current status of centralized repository or state
//action contains updated value which is received from api call
export const getProductsReducer = (state = { productPayload: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { productPayload: action.payload };
        case actionTypes.GET_PRODUCTS_FAIL:
            return { errorPayload: action.payload };
        default:
            return state;
    }
}

export const getProductDetailsReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return { loading: false, product: {} };
        default:
            return state;
    }
}