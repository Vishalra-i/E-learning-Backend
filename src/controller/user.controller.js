import { User } from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


//Create User Account
const CreateUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body
    
    if([name,email,password].some((str)=>str === "" & str.length === 0)){
        throw new ApiError(400,"Fill all details")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })
})