import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Box, Button, styled } from "@mui/material";

import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import Cookies from "js-cookie";

import { DataContext } from "../../context/DataProvider";

//redux action function
import { resetUserDetails } from "../../redux/actions/userActions";
import { addToCart, addIsProductAddedAndNavigatedFlag } from "../../redux/actions/cartActions";

import { addItemToCart, payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: "40%",
    padding: "40px 0 0 80px",
    [theme.breakpoints.down("lg")]: {
        padding: "20px 40px"
    }
}))

const Image = styled("img")({
    padding: 15,
    width: "90%"
})

const StyledButton = styled(Button)(({ theme }) => ({
    width: "48%",
    height: 40,
    borderRadius: 2,
    [theme.breakpoints.down("lg")]: {
        width: "46%"
    },
    [theme.breakpoints.down("sm")]: {
        width: "48%"
    },
    [theme.breakpoints.between("md", "lg")]: {
        fontSize: 10
    }
}))

const ActionItem = (props) => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";
    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { globalContextData } = useContext(DataContext);

    const addItemToReduxCart = (navigateToCart) => {
        const exist = cartItems.find(product => product._id === props.product._id);
        if(exist) {
            const item = { ...props.product, quantity: exist.quantity + 1 };
            dispatch(addToCart(item, true));
        }
        else {
            const item = { ...props.product, quantity: 1 };
            dispatch(addToCart(item, false));
        }
        if(navigateToCart) {
            if(isLoggedIn) {
                dispatch(addIsProductAddedAndNavigatedFlag());
            }
            navigate("/cart");
        }
    }

    const addProductToCart = async (navigateToCart) => {
        let error = false;
        if(isLoggedIn) {
            const { data, status } = await addItemToCart(props.product._id);
            if(status === 200) {
                //No action required in this block as of now
            }
            else {
                error = true;
                if(data.message !== undefined) {
                    if(data.message.includes("Session expired")) {
                        dispatch(resetUserDetails());
                    }
                    globalContextData.setErrorDialog(data.message);
                }
            }
        }
        if(!error) {
            addItemToReduxCart(navigateToCart);
        }
    }

    const buyNow = async () => {
        const discount = props.product.price.mrp - props.product.price.cost;
        const deliveryCharge = 40;
        const totalPriceToPay = props.product.price.mrp - discount + deliveryCharge;
        const email = "demo@gmail.com";
        const mobile = "9876543210";

        const response = await payUsingPaytm({ amount: totalPriceToPay, email: email, mobile: mobile });
        const information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        post(information);
    }

    return (
        <LeftContainer>
            <Box style={{ padding: "15px 20px", marginBottom: 10, border: "1px solid #f0f0f0" }}>
                <Image src={props.product.detailUrl} alt="detail-product-img" />
            </Box>
            <StyledButton variant="contained" style={{ marginRight: 10, background: "#ff9f00" }} onClick={() => addProductToCart(true)}><Cart />Add to Cart</StyledButton>
            <StyledButton variant="contained" style={{ background: "#fb541b" }} onClick={() => { addProductToCart(false); buyNow() }}><Flash />Buy Now</StyledButton>
        </LeftContainer>
    );
}

export default ActionItem;