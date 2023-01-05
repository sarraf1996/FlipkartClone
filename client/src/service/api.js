import axios from 'axios';

const URL = "http://localhost:8000";

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log("Error while calling signup api ", error.message);
        return error.response;
    }
}

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data, { withCredentials: true });
    } catch (error) {
        console.log("Error while calling login api ", error.message);
        return error.response;
    }
}

//It is a good idea to use POST or DELETE requests instead of GET requests for the logout
//endpoints, in order to prevent accidental or malicious logouts.
export const authenticateLogout = async () => {
    try {
        return await axios.post(`${URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.log("Error while calling logout api ", error.message);
        return error.response;
    }
}

export const addItemToCart = async (productId) => {
    try {
        return await axios.post(`${URL}/cart/add`, { productId: productId }, { withCredentials: true });
    } catch (error) {
        console.log("Error while calling addItemToCart api ", error.message);
        return error.response;
    }
}

export const updateCartDetails = async (cartItems, totalCartPriceToPay) => {
    try {
        return axios.patch(`${URL}/cart/update`, { cartItems: cartItems, totalCartPriceToPay: totalCartPriceToPay }, { withCredentials: true });
    } catch (error) {
        console.log("Error while calling updateCartDetails api ", error.message);
        return error.response;
    }
}

export const payUsingPaytm = async (data) => {
    try {
        const response = await axios.post(`${URL}/payment`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error while calling payment api ", error.message);
        return error.response;
    }
}