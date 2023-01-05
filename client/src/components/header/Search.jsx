import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Box, InputBase, List, ListItem, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";

const Container = styled(Box)`
    margin-left: 10px;
    width: 35vw;
`
const SearchContainer = styled(Box)`
    background: #fff;
    border-radius: 2px;
    display: flex;
`
const InputSearchBase = styled(InputBase)`
    width: 100%;
    padding-left: 10px;
    font-size: unset;
`
const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`
const ListWrapper = styled(List)`
    position: absolute;
    width: 35vw;
    color: #000;
    background: #FFFFFF;
    margin-top: 5px;
    padding: 0;
`

const Search = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const payload = useSelector(state => state.getProducts);
    let products = []
    if(payload.productPayload) {
        products = payload.productPayload.products;
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const getText = (e) => {
        setText(e.target.value);
    }

    return (
        <Container>
            <SearchContainer>
                <InputSearchBase 
                    placeholder="Search for products, brands and more"
                    onChange={getText}
                    value={text}
                />
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
            </SearchContainer>
            {
                text &&
                    <ListWrapper>
                        {
                            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                <ListItem>
                                    <Link to={`/product/${product.id}`}
                                        onClick={() => setText("")}
                                        style={{ textDecoration: "none" }}>
                                            {product.title.longTitle}
                                    </Link>
                                </ListItem>
                            ))
                        }
                    </ListWrapper>
            }
        </Container>
    );
}

export default Search;