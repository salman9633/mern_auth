import express from "express";
const router = express.Router()
import {
    auth,
    getUserProfile,
    logoutUser,
    registerUser,
    updaterUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/auth', auth);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile)
                        .put(protect,updaterUserProfile)

export default router


