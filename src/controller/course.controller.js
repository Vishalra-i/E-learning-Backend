import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {Course} from "../models/course.model.js";

//Create new course only if user is admin
const createCourse = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const user = await User.findById(_id);

  if (!user.isAdmin()) {
    throw new ApiError(403, "Only admins can create courses");
  }

  const { title, description, category, price ,level } = req.body;

  if (!title || !description || !category || !price || !level) {
    throw new ApiError(400, "All fields are required");
  }


  const course = await Course.create({
    title,
    description,
    category,
    price,
    level
  });
   
  if (!course) {
    throw new ApiError(500, "Failed to create course");
  }
  
  return res.status(201)
  .json(new ApiResponse(true, "Course created successfully", course));
  
})

// Get all courses with filtering and pagination
const getAllCourses = asyncHandler(async (req, res) => {

  // Extract query parameters for filtering and pagination
  const { category, level, page = 1, limit = 10 } = req.query;

  // Construct the filter object based on provided query parameters
  const filter = {};
  if (category) {
      filter.category = category;
  }
  if (level) {
      filter.level = level;
  }

  // Implement pagination
  const skip = (page - 1) * limit;

  // Query courses from the database with filtering and pagination
  const courses = await Course.find(filter)
                              .skip(skip)
                              .limit(limit);

  // Count total number of courses (without pagination)
  const totalCount = await Course.countDocuments(filter);

  if (!courses || courses.length === 0) {
      throw new ApiError(404, "No courses found");
  }

  // Return the response with retrieved courses and pagination metadata
  return res.status(200)
  .json(new ApiResponse(200, {
      courses,
      pagination: {
          total: totalCount,
          page,
          limit
      }
  },"Courses retrieved successfully"));
});

//Update Course only if user is admin
const updateCourse = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const user = await User.findById(_id);
  const {courseId} = req.params;
  const { title, description, category, price ,level } = req.body;

  if (!user.isAdmin()) {
    throw new ApiError(403, "Only admins can update courses");
  }

  const course = await Course.findById({_id:courseId});
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if(title){
     course.title = title;
  }
  if(description){
    course.description = description;
  }
  if(category){
    course.category = category;
  }
  if(price){
    course.price = price;
  }
  if(level){
    course.level = level;
  }

  await course.save()

  const updatedCourse = await Course.findById(courseId);
  if (!updatedCourse) {
    throw new ApiError(500, "Failed to update course");
  }
 

  return res.status(200)
  .json(new ApiResponse(200, updateCourse,"Course updated successfully", ));
})

//Delete Course only if user is admin
const deleteCourse = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { courseId } = req.params;

  if (!user.isAdmin()) {
    throw new ApiError(403, "Only admins can delete courses");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const deletedCourse = await Course.findByIdAndDelete(courseId);
  

    res.status(200)
    .json(new ApiResponse(200, "Course deleted successfully", null));
});
  






export { 
         createCourse ,
         getAllCourses ,
         updateCourse ,
         deleteCourse
};

