import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcrypt";

import User from "../models/User.js";

export const PassportConfig = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "email"
    },
    async (username, password, done) => {
        try {
            const existingUser = await User.findOne({ email: username });
            if(!existingUser) {
                return done(null, false);
            }
            const isPasswordMatching = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordMatching) {
                return done(null, false);
            }
            return done(null, existingUser);
        } catch (error) {
            return done(error);
        }
    }
    ));

    // used to serialize the user for the session and is called during login only
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user and is called on all subsequent request
    // it is called by passport.session() middleware
    passport.deserializeUser(async (id, done) => {
        try {
            const existingUser = await User.findById(id);
            done(null, existingUser);
        } catch (error) {
            done(error);
        }
    });
}

//middleware
export const isAuthenticated = (request, response, next) => {
    if(request.isAuthenticated()) {
        return next();
    }
    response.clearCookie("isLoggedIn");
    response.status(401).json({ message: "Session expired or not logged in. Please login again..." });
}