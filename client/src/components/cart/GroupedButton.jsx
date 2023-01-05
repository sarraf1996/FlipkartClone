import { ButtonGroup, Button, styled } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

//redux action function
import { updateCart, removeFromCart, resetCartDetails } from "../../redux/actions/cartActions";

const Component = styled(ButtonGroup)`
    display: flex;
    margin-top: 30px;
`
const StyledButton = styled(Button)`
    border-radius: 50%;
`

const GroupedButton = (props) => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    const { cartItems, totalCartPriceToPay } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const handleItemCount = (action, item) => {
        if(action === "addOneItem") {
            dispatch(updateCart(item._id, item.quantity + 1));
        }
        else {
            if(item.quantity <= 1) {
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
            else {
                dispatch(updateCart(item._id, item.quantity - 1));
            }
        }
    }

    return (
        <Component>
            <StyledButton onClick={() => handleItemCount("removeOneItem", props.item)}>-</StyledButton>
            <Button disabled style={{ color: "#000", fontSize: 15, fontWeight: 600 }}>{props.item.quantity}</Button>
            <StyledButton onClick={() => handleItemCount("addOneItem", props.item)}>+</StyledButton>
        </Component>
    );
}
export default GroupedButton;