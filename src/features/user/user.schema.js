import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String, unique: true, required: true,
    },
    password: {
        type: String,
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // }
})