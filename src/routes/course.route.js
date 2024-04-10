import {Router} from "express"
import { createCourse } from "../controller/course.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router()

router.route("/create").post(verifyJWT,createCourse)


export default router ;