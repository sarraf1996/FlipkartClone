import express from "express";

import passport from "passport";

//middleware
import { isAuthenticated } from "../passport/PassportConfig.js";

//controllers
import { userSignup, userLogin, userLogout, getUserDetails } from "../controller/UserController.js";
import { getProducts, getProductDetails } from "../controller/ProductController.js";
import { addItemToCart, getCartDetails, removeCartItem, updateCartDetails, resetCartDetails } from "../controller/CartController.js";
import { addPaymentGateway, paytmResponse } from "../controller/PaymentController.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", passport.authenticate("local"), userLogin);
//It is a good idea to use POST or DELETE requests instead of GET requests for the logout
//endpoints, in order to prevent accidental or malicious logouts.
router.post("/logout", isAuthenticated, userLogout);

router.get("/user/details", isAuthenticated, getUserDetails);

router.get("/products", getProducts);
router.get("/product/:id", getProductDetails);

router.post("/cart/add", isAuthenticated, addItemToCart);
router.get("/cart/getCartDetails", isAuthenticated, getCartDetails);
router.delete("/cart/removeCartItem", isAuthenticated, removeCartItem);
router.patch("/cart/update", isAuthenticated, updateCartDetails);
router.delete("/cart/reset", isAuthenticated, resetCartDetails);

router.post("/payment", addPaymentGateway);
router.post("/callback", paytmResponse);

export default router;