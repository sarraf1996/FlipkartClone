import { useState, useContext, useEffect } from "react";

import { useSelector } from "react-redux";

import { DataContext } from "../../context/DataProvider";

import { useMediaQuery, useTheme, AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, styled } from "@mui/material";

import { Menu } from '@mui/icons-material';

import { Link } from "react-router-dom";

import InfoDialog from "../info/InfoDialog";

//redux action function
import { resetUserDetails } from "../../redux/actions/userActions";

//components
import Search from './Search';
import CustomButtons from './CustomButtons';
import LoginDialog from "../login/LoginDialog";

const StyledHeader = styled(AppBar)`
    backgrouud: #2874f0;
    height: 55px;
`
const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    text-decoration: none;
    color: inherit;
`
const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: "0 0 0 auto",
    [theme.breakpoints.between("md", "xl")]: {
        marginLeft: "3%"
    }
}))

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("md")]: {
        display: "block"
    }
}))

// & > div (child) > button / p / div (grand childrens) used to style nested child components from parent component directly, using css property
const DrawerListItem = styled(ListItem)`
    & > div > button, & > div > p, & > div > a {
        margin-top: 20px !important;
    }
    & > div > button {
        color: #fff;
        background: #1976d2;
    }
`

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [infoDialog, setInfoDialog] = useState("");
    const [errorDialog, setErrorDialog] = useState("");

    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const { errorMessage } = useSelector(state => state.getUserDetails);

    const { globalContextData, setGlobalContextData } = useContext(DataContext);

    useEffect(() => {
        setGlobalContextData({ ...globalContextData,
            setOpenDrawer: setOpenDrawer,
            setOpenLoginDialog: setOpenLoginDialog,
            setInfoDialog: setInfoDialog,
            setErrorDialog: setErrorDialog
        });
    }, []);

    const theme = useTheme();

    const isCurrentWindowSizeDownMedium = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if(!isCurrentWindowSizeDownMedium) {
            if(globalContextData.setOpenMenu) {
                globalContextData.setOpenMenu(null);
            }
            setOpenDrawer(false);
        }
        if(isCurrentWindowSizeDownMedium) {
            if(!openDrawer && globalContextData.setOpenMenu) {
                globalContextData.setOpenMenu(null);
            }
        }
    }, [isCurrentWindowSizeDownMedium]);

    const handleOpen = () => {
        setOpenDrawer(true);
    }

    const handleClose = () => {
        setOpenDrawer(false);
    }

    const list = () => (
        <Box style={{ width: 200 }}>
            <List>
                <DrawerListItem button>
                    <CustomButtons />
                </DrawerListItem>
            </List>
        </Box>
    )

    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton style={{ color: "inherit" }} onClick={handleOpen}>
                    <Menu />
                </MenuButton>
                <Drawer open={openDrawer} onClose={handleClose}>
                    {
                        list()
                    }
                </Drawer>
                <Component to={"/"}>
                    <img src={logoURL} alt="logo" style={{ width: 75 }}/>
                    <Box style={{ display: "flex" }}>
                        <SubHeading>Explore
                            &nbsp;
                            <Box component="span" style={{ color: "#FFE500" }}>Plus</Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt="sub-logo" />
                    </Box>
                </Component>
                <Search />
                {
                    !isCurrentWindowSizeDownMedium &&
                        <CustomButtonWrapper>
                            <CustomButtons />
                        </CustomButtonWrapper>
                }
                {
                    openLoginDialog && 
                        <LoginDialog openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} />
                }
                {
                    infoDialog ? 
                        <InfoDialog info={infoDialog} setInfo={setInfoDialog} />
                    :
                    errorDialog && 
                        <InfoDialog error={errorDialog} setError={setErrorDialog} />
                }
                {
                    errorMessage &&
                        <InfoDialog error={errorMessage} resetUserDetails={resetUserDetails} />
                }
            </Toolbar>
        </StyledHeader>
    );
}

export default Header;