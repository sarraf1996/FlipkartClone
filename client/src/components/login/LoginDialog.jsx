import { useState, useContext } from "react";

import { DataContext } from "../../context/DataProvider";

import { useDispatch } from "react-redux";

import { Box, Dialog, TextField, Typography, Button, styled } from "@mui/material";

//axios api call
import { authenticateSignup, authenticateLogin } from "../../service/api";

//redux action function
import { updateUserDetails } from "../../redux/actions/userActions";
import { getCartDetails } from "../../redux/actions/cartActions";

const Component = styled(Box)`
    height: 73vh;
    width: 90vh;
`
// & > is used to style child components from parent component directly, using css property
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 30%;
    padding: 45px 35px;
    & > h5, & > p {
        color: #FFFFFF;
        font-weight: 600;
    }
`
// & > is used to style child components from parent component directly, using css property
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`
const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`
const CreateAccount = styled(Typography)`
    font-size: 14px;
    color: #2874f0;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
`
const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px !important;
    font-weight: 600;
`

const accountInitialValues = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup: {
        view: "signup",
        heading: "Looks like you're new here!",
        subHeading: "Sign up with your mobile number to get started"
    }
}

const signupInitialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: ""
}

const loginInitialValues = {
    email: "",
    password: ""
}

const LoginDialog = (props) => {
    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignUp] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState("");
    const [phoneError, setPhoneError] = useState(false);

    const { globalContextData } = useContext(DataContext);

    const dispatch = useDispatch();

    const handleClose = () => {
        setPhoneError(false);
        setError("");
        setLogin(loginInitialValues);
        setSignUp(signupInitialValues);
        toggleAccount(accountInitialValues.login);
        props.setOpenLoginDialog(false);
    }

    const toggleSignup = () => {
        setPhoneError(false);
        setError("");
        setLogin(loginInitialValues);
        setSignUp(signupInitialValues);
        toggleAccount(accountInitialValues.signup);
    }

    //[e.target.name] is to dynamically update the state with respect to particular input event triggered
    //square brackets should be used whenever we are using a variable as a key of an object to update the state
    //using only 1 handler to update corresponding state value for multiple input tags with different name attribute
    const onInputChange = (e) => {
        setSignUp({ ...signup, [e.target.name]: e.target.value });
    }

    const handlePhoneOnInputChange = (e) => {
        onInputChange(e);

        if(e.target.value === "") {
            setPhoneError(false);
        }
        else {
            const matched = e.target.value.match(/[6-9]{1}[0-9]{9}/);
            if(matched != null) {
                setPhoneError(false);
            }
            else {
                setPhoneError(true);
            }
        }
    }

    const signupUser = async (e) => {
        e.preventDefault();
        setError("");
        if(!phoneError) {
            const signupData = { ...signup, phone: parseInt(signup.phone) };

            const { data, status } = await authenticateSignup(signupData);
            if(status === 200) {
                handleClose();
                globalContextData.setInfoDialog(data.message);
            }
            else {
                if(data.message !== undefined) {
                    setError(data.message);
                }
            }
        }
    }

    //[e.target.name] is to dynamically update the state with respect to particular input event triggered
    //square brackets should be used whenever we are using a variable as a key of an object to update the state
    //using only 1 handler to update corresponding state value for multiple input tags with different name attribute
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setError("");

        /* check all browser cookies except httpOnly without using any package */
        //console.log(document.cookie);

        const {data, status } = await authenticateLogin(login);
        if(status === 200) {
            handleClose();
            dispatch(updateUserDetails(data.firstname));
            dispatch(getCartDetails());
        }
        else {
            if(data !== undefined) {
                setError(data);
            }
        }
    }

    return (
        <Dialog open={props.openLoginDialog} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Image>
                    <form method="post" onSubmit={account.view === "login" ? loginUser : signupUser} style={account.view === "login" ? { margin: "auto 8%" } : { margin: "auto" }}>
                        {
                            account.view === "login" ?
                                <Wrapper>
                                    <TextField type="email" variant="standard" onChange={(e) => onValueChange(e)} name="email" value={login.email} label="Enter Email" required />
                                    <TextField type="password" variant="standard" onChange={(e) => onValueChange(e)} name="password" value={login.password} label="Enter Password" required />
                                    {
                                        error && <Error>{error}</Error>
                                    }
                                    <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                                    <LoginButton type="submit">Login</LoginButton>
                                    <Typography style={{ textAlign: "center" }}>OR</Typography>
                                    <RequestOTP>Request OTP</RequestOTP>
                                    <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                                </Wrapper>
                            :
                                <Wrapper>
                                    <TextField inputProps={{ maxLength: 20 }} variant="standard" onChange={(e) => onInputChange(e)} name="firstname" value={signup.firstname} label="Enter Firstname" required />
                                    <TextField inputProps={{ maxLength: 20 }} variant="standard" onChange={(e) => onInputChange(e)} name="lastname" value={signup.lastname} label="Enter Lastname" required />
                                    <TextField type="email" variant="standard" onChange={(e) => onInputChange(e)} name="email" value={signup.email} label="Enter Email" required />
                                    <TextField type="password" variant="standard" onChange={(e) => onInputChange(e)} name="password" value={signup.password} label="Enter Password" required />
                                    <TextField
                                        inputProps={{ inputMode: "numeric", maxLength: 10 }}
                                        error={phoneError}
                                        helperText="1st digit from [6-9] and rest any 9 digits"
                                        variant="standard"
                                        onChange={(e) => handlePhoneOnInputChange(e)}
                                        name="phone"
                                        value={signup.phone}
                                        label="Enter Phone"
                                        required
                                    />
                                    {
                                        error && <Error>{error}</Error>
                                    }
                                    <LoginButton type="submit">Continue</LoginButton>
                                </Wrapper>
                        }
                    </form>
                </Box>
            </Component>
        </Dialog>
    );
}

export default LoginDialog;