import Razorpay from "razorpay";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PaymentModel } from "./payment.schema.js";
import { UserModel } from "../user/user.repository.js";

const razorpay = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
});

export default class PaymentRepository {

    async getAllOrders(userID) {
        try {
            const user = await UserModel.findById(userID);
            if (user.isAdmin == true) {
                const orders = await PaymentModel.find();
                return orders;
            } else {
                return "you are not the admin to do the task"
            }

        } catch (err) {
            console.log(err)
        }
    }

    async getUserOrders(userID) {
        console.log(userID)
        try {
            const userOrders = await PaymentModel.find({ userID: userID }).populate('productID').populate('userID');
            if (userOrders) {
                return userOrders
            } else {
                return "You have 0 orders"
            }

        } catch (err) {
            console.log(err)
        }
    }

    async createOrder(amount) {
        const options = {
            amount: Number(amount * 100),
            currency: 'INR',
            // receipt: `receipt_order_${Date.now()}`,
        };

        try {
            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new Error("Order creation failed: " + error.message);
        }
    };

    async savePaymentDetails(paymentDetails) {
        console.log("de: ", paymentDetails)
        // const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productIDs } = paymentDetails;
        try {
            const payment = new PaymentModel({
                userID: paymentDetails.userId,
                razorpay_order_id: paymentDetails.razorpay_order_id,
                razorpay_payment_id: paymentDetails.razorpay_payment_id,
                razorpay_signature: paymentDetails.razorpay_signature,
                productID: paymentDetails.productIDs,
            });
            console.log("payment :", payment);
            await payment.save();
        } catch (error) {
            throw new Error("Saving payment details failed: " + error.message);
        }
    }
}
