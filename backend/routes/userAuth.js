import express from "express";
const router = express.Router()
import {
    auth,
    getUserProfile,
    logoutUser,
    registerUser,
    updaterUserProfile
} from "../controllers/userController.js";

router.post('/auth', auth);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile)
                        .put(updaterUserProfile)

export default router


