import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim: true, //removes whitespace from both ends of the string before saving it to the database
 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
}, {timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;
