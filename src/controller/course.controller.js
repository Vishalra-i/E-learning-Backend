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





export { createCourse };

