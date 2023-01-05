import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Button, styled } from "@mui/material";

import Cookies from "js-cookie";

//redux action function
import { removeFromCart, resetCartDetails } from "../../redux/actions/cartActions";

//utils
import { addEllipsis } from "../../utils/common-utils";

//components
import GroupedButton from "./GroupedButton";

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #fff;
`
const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
`
const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`
const RemoveButton = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #000;

`

const CartItem = (props) => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    const { cartItems, totalCartPriceToPay } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const removeItemFromCart = (item) => {
        if(cartItems.length === 1) {
            dispatch(resetCartDetails(isLoggedIn));
        }
        else {
            if(isLoggedIn) {
                const itemPrice = item.quantity * item.price.mrp;
                const itemDiscount = item.quantity * (item.price.mrp - item.price.cost);
                const remainingCartPriceToPay = totalCartPriceToPay - (itemPrice - itemDiscount);
                dispatch(removeFromCart(true, item._id, remainingCartPriceToPay));
            }
            else {
                dispatch(removeFromCart(false, item._id, undefined));
            }
        }
    }

    return (
        <Component>
            <LeftComponent>
                <img src={props.item.url} alt="product" style={{ width: 110 }} />
                <GroupedButton item={props.item} />
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography>{addEllipsis(props.item.title.longTitle)}</Typography>
                <SmallText>Seller:RetailNet
                    <Box component="span">
                        <img src={fassured} alt="fassured-img" style={{ width: 50, marginLeft: 10 }} />
                    </Box>
                </SmallText>
                <Typography style={{ margin: "20px 0" }}>
                    <Box component="span" style={{ fontSize: 18, fontWeight: 600 }}>₹{props.item.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#878787" }}><strike>₹{props.item.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#388E3C" }}>{props.item.price.discount}</Box>
                </Typography>
                <RemoveButton onClick={() => removeItemFromCart(props.item)}>Remove</RemoveButton>
            </Box>
        </Component>
    );
}

export default CartItem;