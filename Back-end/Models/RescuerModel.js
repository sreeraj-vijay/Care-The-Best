import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const rescuerSchema = mongoose.Schema(
  {
    name: {
      type: String,

    },
    email: {
      type: String,

    },
    password: {
      type: String,

    },
    mobile: {
      type: String,

    },
    Certificate: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: false
    },
    follower: [],
    googleLogin: {
      type: Boolean,
      default: false
    },
    approve: {
      type: Boolean,
      default: false
    },
    district: {
      type: String,

    }

  },
  {
    timestamps: true,
  }
);
rescuerSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

rescuerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const Rescuer = mongoose.model("Rescuer", rescuerSchema);
export default Rescuer;