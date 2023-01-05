import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
    width: 80%;
    height: 65vh;
    margin: 80px auto;
`
const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`

const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <Component style={{ background: "#fff" }}>
            <Container>
                <img src={imgurl} alt="empty-cart-img" style={{width: "15%"}} />
                <Typography>Your cart is empty!</Typography>
                <Typography>Add items to it now</Typography>
            </Container>
        </Component>
    );
}

export default EmptyCart;