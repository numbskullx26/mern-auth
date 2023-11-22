import mongoose from "mongoose";

//creating the userSchema for the model

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating the model for the userSchema named "User", always capital first letter

const User = mongoose.model("User", userSchema);

//exporting the model to be used anywhere in the dir
export default User;
