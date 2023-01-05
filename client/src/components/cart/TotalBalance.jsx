import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { Box, Typography, styled } from "@mui/material";

//redux action function
import { totalCartAmountToPay } from "../../redux/actions/cartActions";

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`
const Heading = styled(Typography)`
    color: #878787;
`
// & > is used to style child components from parent component directly, using css property
const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
    & > h6 {
        margin-bottom: 20px;
    }
`
const Price = styled(Box)`
    float: right;
`
const Discount = styled(Typography)`
    color: green;
`

const TotalBalance = (props) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const dispatch = useDispatch();

    const deliveryCharge = 40;

    useEffect(() => {
        let totalPrice = 0, totalDiscount = 0;
        props.cartItems.map(item => {
            totalPrice = totalPrice + (item.quantity * item.price.mrp);
            totalDiscount = totalDiscount + (item.quantity * (item.price.mrp - item.price.cost));
            return null;
        });
        setPrice(totalPrice);
        setDiscount(totalDiscount);
        dispatch(totalCartAmountToPay(totalPrice - totalDiscount + deliveryCharge));
        props.setIsTotalCartPriceSet && props.setIsTotalCartPriceSet(true);
    }, [dispatch, props.cartItems]);

    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({props.cartItems ? props.cartItems.length : 0} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹{deliveryCharge}</Price>
                </Typography>
                <Typography variant="h6">Total Amount
                    <Price component="span">₹{price - discount + deliveryCharge}</Price>
                </Typography>
                <Discount>You will save ₹{discount - deliveryCharge} on this order</Discount>
            </Container>
        </Box>
    );
}

export default TotalBalance;