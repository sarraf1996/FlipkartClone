import * as actionTypes from '../constants/userConstant';

//passing empty string to account attribute of state object to stop error while rendering UI components
//state contains current status of centralized repository or state
//action contains updated value which is received from api call
export const getUserDetailsReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.GET_USER_DETAILS_REQUEST:
            return { loading: true };
        case actionTypes.GET_USER_DETAILS_SUCCESS:
            return { loading: false, account: action.payload.firstname };
        case actionTypes.GET_USER_DETAILS_FAIL:
            return { loading: false, errorMessage: action.payload };
        case actionTypes.GET_USER_DETAILS_RESET:
            return { loading: false };
        case actionTypes.GET_USER_DETAILS_UPDATE:
            return { loading: false, account: action.payload };
        default:
            return state;
    }
}