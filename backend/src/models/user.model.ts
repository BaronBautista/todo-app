import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true},
    password: { type: String, require: true},
}, {
    timestamps: true
})

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;