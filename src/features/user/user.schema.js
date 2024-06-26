import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String, unique: true, required: true,
    },
    password: {
        type: String,
    },
    number: {
        type: Number,
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})