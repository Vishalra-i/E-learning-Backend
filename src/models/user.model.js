import Mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  avatar:{
    type:String,
  },
  verified:{
    type:Boolean,
    default:false
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      console.error('Error comparing passwords:', err);
      return false
    }
  };

  userSchema.methods.generateAuthToken = function () {
    const payload = {
      _id: this._id,
      email: this.email,
      role: this.role
    };
  
    // Generate and sign JWT
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }); // Adjust expiresIn as needed
  };

  userSchema.methods.isAdmin = function() {
    if(this.role === 'admin'){
      return true
    }
    return false
  }

export const User = Mongoose.model("User", userSchema);