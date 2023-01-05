import { useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//redux action function
import { getProductDetails } from "../../redux/actions/productActions";

//component
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
    background: #F2F2F2;
    margin-top: 55px;
`
const Container = styled(Grid)(({ theme }) => ({
    background: "#FFFFFF",
    display: "flex",
    [theme.breakpoints.down("md")]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding-left: 10px;
`

const DetailView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const { loading, product } = useSelector(state => state.getProductDetails);

    return (
        <Component>
            {
                (!loading && product && Object.keys(product).length) &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product}/>
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }
        </Component>
    );
}

export default DetailView;