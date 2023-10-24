import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please enter a valid e-mail"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "minimum password length is 6 char"],
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);
export default User;
