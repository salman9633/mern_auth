import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";

const protect =asyncHandler (async (req, res, next) => {
    let token;

    token =await req.body.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
            req.user = await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Invalid Token')
        }
    } else {
        res.status(401).json(
            {error:'Token Not Yet Created'});
       
    }

})

export {protect}