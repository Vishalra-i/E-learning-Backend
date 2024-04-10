import {Router} from "express"
import { createCourse, deleteCourse, getAllCourses, updateCourse } from "../controller/course.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router()

router.route("/").get(verifyJWT, getAllCourses)
router.route("/:courseId").patch(verifyJWT, updateCourse).delete(verifyJWT, deleteCourse)
router.route("/create").post(verifyJWT,createCourse)

//Enrollment Routes



export default router ;