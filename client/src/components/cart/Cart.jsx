import { useState, useEffect, useRef } from "react";

import { Grid, Box, Typography, Button, styled } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

//redux action function
import { removeIsProductAddedAndNavigatedFlag, removeIsCartModifiedFlag } from "../../redux/actions/cartActions";

//components
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./EmptyCart";

//axios api call
import { updateCartDetails, payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const Container = styled(Grid)(({ theme }) => ({
    padding: "30px 135px",
    [theme.breakpoints.down("md")]: {
        padding: "15px 0"
    }
}))

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down("md")]: {
        marginBottom: 15
    }
}))

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`
const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`
const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250px;
    height: 51px;
    border-radius: 2px;
`

const Cart = () => {
    const [isTotalCartPriceSet, setIsTotalCartPriceSet] = useState(false);

    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    const { cartItems, totalCartPriceToPay, isCartModified, isProductAddedAndNavigated } = useSelector(state => state.cart);

    const allCartItems = useRef([]);

    allCartItems.current = cartItems.map(item => {
        return {
            _id: item._id,
            quantity: item.quantity
        }
    });

    const totalCartPrice = useRef(0);

    totalCartPrice.current = totalCartPriceToPay;

    const isCartUpdated = useRef(false);

    isCartUpdated.current = isCartModified;

    const dispatch = useDispatch();

    const updateCart = () => {
        dispatch(removeIsCartModifiedFlag());
        if(isLoggedIn) {
            updateCartDetails(allCartItems.current, totalCartPrice.current);
        }
    }

    const handleUnload = () => {
        //We cannot use state value of isCartModified here for comparing in if condition as while
        //refreshing the page, the state value will be lost and will be shown as undefined
        //In order to overcome this issue, use useRef hook which persists data between renders
        if(isCartUpdated.current) {
            updateCart();
        }
        window.removeEventListener("unload", handleUnload);
    }

    useEffect(() => {
        window.addEventListener("unload", handleUnload);

        return () => {
            //We cannot use current state value inside cleanup function of useEffect hook
            //In order to overcome this issue, use useRef hook which persists data between renders
            //Also, useRef hook does not cause re-render of component when updated unlike updating state
            if(isCartUpdated.current) {
                updateCart();
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if(isLoggedIn && isProductAddedAndNavigated && isTotalCartPriceSet) {
            updateCartDetails(allCartItems.current, totalCartPrice.current);
            dispatch(removeIsProductAddedAndNavigatedFlag());
        }
    }, [dispatch, isTotalCartPriceSet]);

    const buyNow = async () => {
        const email = "demo@gmail.com";
        const mobile = "9876543210";

        const response = await payUsingPaytm({ amount: totalCartPriceToPay, email: email, mobile: mobile });
        const information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        post(information);
    }

    return (
        <>
            {
                cartItems.length ?
                    <Container container>
                        <LeftComponent item xl={9} lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My Cart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item => (
                                    <CartItem key={item._id} item={item} />
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton onClick={() => buyNow()}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems} setIsTotalCartPriceSet={setIsTotalCartPriceSet} />
                        </Grid>
                    </Container>
                :
                    <EmptyCart />
            }
        </>
    );
}

export default Cart;