import {Router} from "express"
import { createCourse, deleteCourse, getAllCourses, updateCourse } from "../controller/course.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { enrollCourse , enrolledCourse } from "../controller/enrollment.controller.js";



const router = Router()
//Get All Course Available on App
router.route("/").get(verifyJWT, getAllCourses)
//Update and delete course only for admin
router.route("/:courseId").patch(verifyJWT, updateCourse).delete(verifyJWT, deleteCourse)
//Create new course only for admin
router.route("/create").post(verifyJWT,createCourse)




//=======Enrollment Routes====

//All Enrolled corse
router.route("/enroll").get(verifyJWT, enrolledCourse)
//Enroll in new course
router.route("/enroll/:courseId").post(verifyJWT, enrollCourse)



export default router ;