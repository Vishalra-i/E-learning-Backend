import { User } from "../models/user.model.js"
import {Token} from "../models/token.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { deleteOnCloudnary, uploadOnCloudinary } from "../utils/cloudinary.js"
import verifyEmail from "../utils/resend.js" 


//Create User Account
const CreateUser = asyncHandler(async(req,res)=>{
    const {name, email, password , role} = req.body
    
    if([name,email,password].some((str)=>str === "" )){
        throw new ApiError(400,"Fill all details")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(400, "User already exists")
    }
    
    const Localavatar = req.file.path
    console.log(Localavatar)

    
    
    if(!Localavatar){
        throw new ApiError(400, "Error on Upload avatar")
    }
    const avatar = await uploadOnCloudinary(Localavatar)

    if(!avatar){
        throw new ApiError(500, "Error on upload avatar on cloudinary")
    }
     
    if(avatar.url === ""){
        throw new ApiError(500, "Error on upload avatar on cloudinary")
    }

    if(email.length < 5){
        throw new ApiError(400, "Email is too short")
    }
     
   
    
    const user = await User.create({
        name,
        email : email.toLowerCase() ,
        password,
        role: role ? "admin" : "user" ,
        avatar : avatar.url,
    })
    
    let CreatedUser = await User.findById(user._id).select("-password")

    if(!CreatedUser){
        throw new ApiError(500, "Error on creating user please try again Later")
    }
    const token = await Token.create({
        userId: CreatedUser._id,
        token:  Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    })

    console.log(token.token)

    const link = `${process.env.CLIENT_URL}/${CreatedUser._id}/verify/${token.token}`
    console.log(link)
    const emailsent = await verifyEmail(CreatedUser.email , link)
    console.log(emailsent)

    
    
 
    return res.status(201)
    .json(new ApiResponse(201, CreatedUser ,"An Email sent to verify your email" ))
    
})

//Verify User Email
const verifyUser = asyncHandler(async(req,res)=>{
    const {userId, token} = req.params
    let user = await User.findById({_id:userId})
    if(!user){
        throw new ApiError(404, "Invalid Link")
    }

    const verifyToken = await Token.findOne({
        userId: user._id,
        token
    })


    if(!verifyToken){
        throw new ApiError(404, "Invalid Link")
    }

    await user.updateOne({verified: true})

    await Token.deleteOne({_id: verifyToken._id})
    
    user = await User.findById(user._id).select("-password")

    return res.status(200)
              .json(
                new ApiResponse(200,user,"Email Verified Successfully")
              )
})

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    // Check if user is verified
    if (!user.verified) {
        // If user is not verified, resend verification link and return error
        const token = new Token({
            userId: user._id,
            token: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
        });
        await token.save();

        const link = `${process.env.CLIENT_URL}/${user._id}/verify/${token.token}`;
        await verifyEmail(user.email, link);

        throw new ApiError(403, "Email not verified. Verification link has been resent.");
    }


    // Generate JWT token (example)
    const token = user.generateAuthToken();

     // Set token as a cookie
     res.cookie("token", token, {
        httpOnly: true,
        secure: true ,
    })
    // Return successful response with token
    return res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
});

//Logout User
const logoutUser = asyncHandler(async (req, res, next) => {
    // Clear token cookie
    res.clearCookie("token");

    // Respond with a success message
    res.status(200)
        .json(new ApiResponse(200, null, "Logout successful"));
});

//Update User Details Name/Email/Password/Avatar/role
const updateUser = asyncHandler(async (req, res, next) => {
    const _id = req.user._id;
    const { name,email, password ,role} = req.body;

    const user = await User.findById(_id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const avatarLocalPath = req.file?.path;
    let avatar ;
    if(avatarLocalPath){
        avatar = await uploadOnCloudinary(avatarLocalPath);
        if(!avatar){
            throw new ApiError(500, "Error on upload avatar on cloudinary")
        }
        const publicId = user.avatar.match(/\/v\d+\/(.+)\.\w{3,4}$/)[1]
        console.log(publicId)
        await deleteOnCloudnary(publicId)
    }


    if(email){
        user.email = email;
        user.verified = false;
        await Token.deleteOne({userId: user._id})
        const newToken = new Token({
            userId: user._id,
            token: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
        });
        await newToken.save();

        const link = `${process.env.CLIENT_URL}/${user._id}/verify/${newToken.token}`;
        await verifyEmail(user.email, link);
    }
    if(password){
        user.password = password;
    }
    if(avatar){
        user.avatar = avatar.url;
    }
    if(name){
        user.name = name;
    }
    if(role){
        user.role = role ? "admin" : "user" ;
    }
    await user.save();

    const updatedUser = await User.findById(_id).select("-password")

    if(email && updateUser.email !== req.user.email){
        res.status(200)
           .json(new ApiResponse(200, updatedUser, "User need to verify new emai"))
    }else{
        return res.status(200)
                .json(new ApiResponse(200, updatedUser, "User Updated Successfully"))
    }
   
})



export {
    CreateUser,
    verifyUser,
    loginUser,
    logoutUser,
    updateUser
}