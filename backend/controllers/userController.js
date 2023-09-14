import asyncHandler from "express-async-handler";
import { User } from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";



//Desc     authenticate User/Login
//Route    POST api/users/auth
//Access   public
const auth = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401)
        throw new Error('invalid Email or Password');
    }

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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User Logged Out' })
})

//Desc     Get user Prodfile
//Route    GET api/users/profile
//Access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
})

//Desc     Update user Prodfile
//Route    PUT api/users/profile
//Access   Private
const updaterUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser=await user?.save();
        res.status(200).json(updatedUser)
    } else {
        res.status(404);
        throw new Error('user not found')
    }
})

export {
    auth,
    getUserProfile,
    logoutUser,
    registerUser,
    updaterUserProfile,
}