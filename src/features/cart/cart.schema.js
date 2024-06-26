import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    }
    // productID: String
})