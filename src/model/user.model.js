import Mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  }
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

export default userSchema;  
