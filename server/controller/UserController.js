import User from '../models/User.js';

import bcrypt from "bcrypt";

export const userSignup = async (request, response) => {
    try {
        const existingUser = await User.findOne({ email: request.body.email });
        if(existingUser) {
            return response.status(401).json({ message: "Email already exist." });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { ...request.body, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ message: "User created successfully. Please login to continue." });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const userLogin = (request, response) => {
    response.cookie("isLoggedIn", "true");
    response.status(200).json({ message: "Login successful.", firstname: request.user.firstname });
}

export const userLogout = (request, response) => {
    request.logout((error) => {
        if(error) {
            response.status(500).json({ message: "Some error occurred, please logout again." })
        }
        response.clearCookie("isLoggedIn");
        response.status(200).json({ message: "Logout successful." })
    });
}

export const getUserDetails = (request, response) => {
    response.status(200).json({ firstname: request.user.firstname });
}