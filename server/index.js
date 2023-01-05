import express from "express";
import session from "express-session";

import passport from "passport";
import { PassportConfig } from "./passport/PassportConfig.js";

import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
// import DefaultData from "./default.js";
import router from "./routes/route.js";

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 //cookie expires in 30 minutes
    }
}));
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

PassportConfig(passport);

//handle all routes
app.use("/", router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

const port = parseInt(process.env.PORT) || 8000;

app.listen(port, () => console.log(`Server is running successfully on PORT ${port}`));

// DefaultData();