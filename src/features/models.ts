import mongoose from "mongoose";
import { userSchema } from "./schemas";

const UserModel = mongoose.model('User', userSchema)

export {
    UserModel
}