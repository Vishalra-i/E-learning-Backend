import { Router } from "express";
import {upload} from "../middleware/multer.middleaware.js"
import { CreateUser, loginUser, logoutUser, updateUser, verifyUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router()

router.route('/register').post(
    upload.single('avatar'),
    CreateUser
)

router.route('/login').post(loginUser)
router.route("/logout").post(logoutUser);
router.route("/:userId/verify/:token").get(verifyUser)
router.route("/update").patch(verifyJWT,upload.single('avatar'),updateUser)


export default router