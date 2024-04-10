import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {Course} from "../models/course.model.js";
import {Enrollment} from "../models/enrollment.model.js"

//Enroll User for course
const enrollCourse = asyncHandler(async(req,res,next)=>{
    const {courseId} = req.params;
    const _id = req.user._id;
    const user = await User.findById(_id);
    const course = await Course.findById(courseId);
    if(!user){
       throw new ApiError(404,"User not authenticate")
    }
    if(!course){
        throw new ApiError(404, "Course not found")
    }

    const exitedEnrolled = await Enrollment.findOne({user: user._id , course : course._id})
    if(exitedEnrolled){
        return next(new ApiError("Already enrolled", 400));
    }
    if(!course){
        return next(new ApiError("Course not found",404));
    }
    const enrollment = await Enrollment.create({
        course: course?._id,
        user: user?._id,
    })
    if(!enrollment){
        throw new ApiError(500,"Failed To Enroll")
    }
    return res.status(201)
    .json(new ApiResponse(201,enrollment,"Enrolled Successfully"));
})

//User All Enrolled Course
const enrolledCourse = asyncHandler(async(req, res, next)=>{
    const _id = req.user?._id;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(400,"User is not authenticate")
    }

    const enrollments = await Enrollment.find({user: user?._id}).populate("course")
    if(!enrollments){
        throw new ApiError(500, "Failed To Get Enrollments or User not enrolled in any Course")
    }
    return res.status(200)
    .json(new ApiResponse(200, enrollments, "Enrollments Fetched Successfully"));
})

export {
    enrollCourse,
    enrolledCourse
}