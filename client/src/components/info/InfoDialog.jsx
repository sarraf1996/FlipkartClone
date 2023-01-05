import { useState } from "react";

import { useDispatch } from "react-redux";

import { Box, Dialog, Typography, styled } from "@mui/material";

const Component = styled(Box)(({ theme }) => ({
    height: "35vh",
    width: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        width: "85vw"
    }
}))

const Info = styled(Typography)`
    text-align: center;
    font-size: 16px;
    color: green;
    font-weight: 600;
`
const Error = styled(Typography)`
    text-align: center;
    font-size: 16px;
    color: #ff6161;
    font-weight: 600;
`

const InfoDialog = (props) => {
    const [openInfoDialog, setOpenInfoDialog] = useState(props.info ? props.info : props.error);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenInfoDialog("");
        props.setInfo && props.setInfo("");
        props.setError && props.setError("");
        props.resetUserDetails && dispatch(props.resetUserDetails());
    }

    return (
        <Dialog open={Boolean(openInfoDialog)} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                {
                    props.info ?
                        <Info>{openInfoDialog}</Info>
                    :
                        <Error>{openInfoDialog}</Error>
                }
            </Component>
        </Dialog>
    );
}

export default InfoDialog;