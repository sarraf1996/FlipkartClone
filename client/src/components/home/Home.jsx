import { useEffect } from "react";

import { Box, styled } from "@mui/material";

//components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

//api call using redux actions
import { getProducts } from '../../redux/actions/productActions';

import { useDispatch, useSelector } from 'react-redux';

const Component = styled(Box)`
    padding: 10px;
    background: #F2F2F2;
`

const Home = () => {
    const dispatch = useDispatch();
    const payload = useSelector(state => state.getProducts);

    //console.log(payload.productPayload);
    //console.log(payload.productPayload.products);
    //console.log(payload.productPayload.message);
    //console.log(payload.errorPayload);
    //console.log(payload.errorPayload.message);
    let products = [];
    if(payload.productPayload) {
        products = payload.productPayload.products;
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deals of the Day" timer={true} />
                <MidSection />
                <Slide products={products} title="Discounts for You" timer={false} />
                <Slide products={products} title="Suggested Items" timer={false} />
                <Slide products={products} title="Top Selection" timer={false} />
                <Slide products={products} title="Recommended Items" timer={false} />
                <Slide products={products} title="Trending Offers" timer={false} />
                <Slide products={products} title="Season's top picks" timer={false} />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
            </Component>
        </>
    );
}

export default Home;