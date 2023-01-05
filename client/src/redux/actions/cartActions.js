//action folder is used to call api for respective reducers

import axios from "axios";

import * as actionTypes from "../constants/cartConstant";

const URL = "http://localhost:8000";

export const addToCart = (item, exist) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { item: item, exist: exist } });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_TO_CART_FAIL, payload: error.response.data.message });
    }
}

export const addIsProductAddedAndNavigatedFlag = () => (dispatch) => {
    try {
        dispatch({ type: actionTypes.ADD_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG_FAIL, payload: error.response.data.message });
    }
}

export const removeIsProductAddedAndNavigatedFlag = () => (dispatch) => {
    try {
        dispatch({ type: actionTypes.REMOVE_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG });
    } catch (error) {
        dispatch({ type: actionTypes.REMOVE_IS_PRODUCT_ADDED_AND_NAVIGATED_FLAG_FAIL, payload: error.response.data.message });
    }
}

export const getCartDetails = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/cart/getCartDetails`, { withCredentials: true });
        dispatch({ type: actionTypes.ADD_TO_CART , payload: data.cartItems });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_TO_CART_FAIL , payload: error.response.data.message });
    }
}

export const removeFromCart = (isLoggedIn, id, remainingCartPriceToPay) => async (dispatch) => {
    try {
        if(isLoggedIn) {
            await axios.delete(`${URL}/cart/removeCartItem`, { data: { productId: id, remainingCartPriceToPay: remainingCartPriceToPay }, withCredentials: true });
        }
        dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: { _id: id } });
    } catch (error) {
        dispatch({ type: actionTypes.REMOVE_FROM_CART_FAIL, payload: error.response.data.message });
    }
}

export const updateCart = (id, newQuantity) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.UPDATE_CART, payload: { _id: id, newQuantity: newQuantity } });
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_CART_FAIL, payload: error.response.data.message });
    }
}

export const removeIsCartModifiedFlag = () => (dispatch) => {
    try {
        dispatch({ type: actionTypes.REMOVE_IS_CART_MODIFIED_FLAG });
    } catch (error) {
        dispatch({ type: actionTypes.REMOVE_IS_CART_MODIFIED_FLAG_FAIL, payload: error.response.data.message });
    }
}

export const resetCartDetails = (isLoggedIn) => async (dispatch) => {
    try {
        if(isLoggedIn) {
            await axios.delete(`${URL}/cart/reset`, { withCredentials: true });
        }
        dispatch({ type: actionTypes.RESET_CART });
    } catch (error) {
        dispatch({ type: actionTypes.RESET_CART_FAIL, payload: error.response.data.message });
    }
}

export const totalCartAmountToPay = (totalCartPriceToPay) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.TOTAL_CART_AMOUNT_TO_PAY, payload: { totalCartPriceToPay: totalCartPriceToPay } });
    } catch (error) {
        dispatch({ type: actionTypes.TOTAL_CART_AMOUNT_TO_PAY_FAIL, payload: error.response.data.message });
    }
}