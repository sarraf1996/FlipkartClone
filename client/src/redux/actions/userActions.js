//action folder is used to call api for respective reducers

import axios from "axios";

import * as actionTypes from "../constants/userConstant";

const URL = "http://localhost:8000";

//used anonymous middleware arrow function to get access to dispatch function
//dispatch function internally invoke the reducers
export const getUserDetails = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_USER_DETAILS_REQUEST });
        const { data } = await axios.get(`${URL}/user/details`, { withCredentials: true });
        dispatch({ type: actionTypes.GET_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

export const resetUserDetails = () => (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_USER_DETAILS_RESET });
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_DETAILS_RESET_FAIL, payload: error.response.data.message });
    }
}

export const updateUserDetails = (firstname) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_USER_DETAILS_UPDATE, payload: firstname });
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_DETAILS_UPDATE_FAIL, payload: error.response.data.message });
    }
}