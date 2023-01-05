//action folder is used to call api for respective reducers

import axios from "axios";

import * as actionTypes from "../constants/productConstant";

const URL = "http://localhost:8000";

//used anonymous middleware arrow function to get access to dispatch function
//dispatch function internally invoke the reducers
export const getProducts = () => async (dispatch) => {
    try {
        const { data } =  await axios.get(`${URL}/products`);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response.data.message });
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } =  await axios.get(`${URL}/product/${id}`);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response.data.message });
    }
}