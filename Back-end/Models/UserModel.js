import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,

    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,

    },
    mobile: {
      type: String,

    },
    profileImageName: {
      type: String
    },
    isListed: {
      type: Boolean,
      default: false
    },
    googleLogin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    const match = await bcrypt.compare(enteredPassword, this.password);
    console.log(match)
    return match;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
export default User;