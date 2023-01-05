import { useState, useContext, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useMediaQuery, useTheme, Box, Typography, Menu, MenuItem, styled } from "@mui/material";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { DataContext } from "../../context/DataProvider";

//axios api call
import { updateCartDetails, authenticateLogout } from "../../service/api";

//redux action function
import { resetUserDetails } from "../../redux/actions/userActions";
import { removeIsCartModifiedFlag, resetCartDetails } from "../../redux/actions/cartActions";

const MenuComponent = styled(Menu)`
    margin-top: 5px;

`
const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`

const Profile = (props) => {
    const [openMenu, setOpenMenu] = useState(null);

    const { cartItems, totalCartPriceToPay, isCartModified } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const { globalContextData, setGlobalContextData } = useContext(DataContext);

    useEffect(() => {
        setGlobalContextData({ ...globalContextData, setOpenMenu: setOpenMenu });
    }, []);

    const theme = useTheme();

    const isCurrentWindowSizeDownMedium = useMediaQuery(theme.breakpoints.down("md"));

    const handleClick = (event) => {
        if(isCurrentWindowSizeDownMedium) {
            globalContextData.setOpenDrawer(true);
        }
        setOpenMenu(event.currentTarget);
    }

    const handleClose = () => {
        setOpenMenu(null);
    }

    const updateCart = () => {
        dispatch(removeIsCartModifiedFlag());
        const allCartItems = cartItems.map(item => {
            return {
                _id: item._id,
                quantity: item.quantity
            }
        });
        updateCartDetails(allCartItems, totalCartPriceToPay);
    }

    const logoutUser = async () => {
        if(isCartModified) {
            updateCart();
        }
        const { data, status } = await authenticateLogout();
        if(status === 200) {
            dispatch(resetUserDetails());
            dispatch(resetCartDetails(false));
        }
        else {
            if(data.message !== undefined) {
                if(data.message.includes("Session expired")) {
                    dispatch(resetUserDetails());
                }
                globalContextData.setErrorDialog(data.message);
            }
        }
    }

    return (
        <>
            <Box onClick={handleClick}>
                <Typography style={{ marginTop: 3, cursor: "pointer" }}>{props.account}</Typography>
            </Box>
            <MenuComponent
                anchorEl={openMenu}
                open={Boolean(openMenu)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); logoutUser(); }}>
                    <PowerSettingsNewIcon color="primary" fontSize="small" />
                    <Logout>Logout</Logout>
                </MenuItem>
            </MenuComponent>
        </>
    );
}

export default Profile;