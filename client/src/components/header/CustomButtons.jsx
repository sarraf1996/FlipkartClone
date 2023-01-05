import { useContext } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Box, Button, Typography, Badge, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { DataContext } from "../../context/DataProvider";

//components
import Profile from "./Profile";

import Cookies from "js-cookie";

// & > is used to style child components from parent component directly, using css property
const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    margin: "0 3% 0 auto",
    "& > button, & > p, & > div": {
        marginRight: 40,
        fontSize: 16,
        alignItems: "center"
    },
    [theme.breakpoints.down("md")]: {
        display: "block"
    }
}))

const LoginButton = styled(Button)`
    color: #2874f0;
    background: #FFFFFF;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
`

const CustomButtons = () => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    const { globalContextData } = useContext(DataContext);

    const { cartItems } = useSelector(state => state.cart);

    const { account } = useSelector(state => state.getUserDetails);

    const openDialog = () => {
        globalContextData.setOpenDrawer(false);
        globalContextData.setOpenLoginDialog(true);
    }

    return (
        <Wrapper>
            {
                isLoggedIn ?
                    <Profile account={account} />
                :
                    <LoginButton variant="contained" onClick={() => openDialog()}>Login</LoginButton>
            }
            <Typography style={{ marginTop: 3, width: 135 }} onClick={() => globalContextData.setOpenDrawer(false)}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }} onClick={() => globalContextData.setOpenDrawer(false)}>More</Typography>

            <Link to="/cart" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }} onClick={() => globalContextData.setOpenDrawer(false)}>
                <Badge badgeContent={cartItems ? cartItems.length : 0} color="secondary">
                    <ShoppingCartIcon />
                </Badge>                    
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Link>
        </Wrapper>
    );
}

export default CustomButtons;