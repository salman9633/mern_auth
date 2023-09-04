import asyncHandler from "express-async-handler";
import { User } from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

const auth = asyncHandler(async (req, res) => {
    res.status(401)
    throw new Error('error')
    res.status(200).json({ mess: 'auth user' })
})

//Desc     Register New User
//Route    POST api/users
//Access   public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400);
        throw new Error('user already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('inavalid data')
    }

})

//Desc     Logout
//Route    POST api/users/logout
//Access   public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Logout user"
    });
})

//Desc     Get user Prodfile
//Route    GET api/users/profile
//Access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "user profile"
    });
})

//Desc     Update user Prodfile
//Route    PUT api/users/profile
//Access   Private
const updaterUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "update profile"
    });
})

export {
    auth,
    getUserProfile,
    logoutUser,
    registerUser,
    updaterUserProfile,
}