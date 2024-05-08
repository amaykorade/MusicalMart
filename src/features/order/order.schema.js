import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }
})