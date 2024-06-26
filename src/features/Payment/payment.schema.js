import mongoose from "mongoose";
// import { cartSchema } from "../cart/cart.schema";

const paymentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    productID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    }]
}, { timestamps: true });

export const PaymentModel = mongoose.model('Payment', paymentSchema);
