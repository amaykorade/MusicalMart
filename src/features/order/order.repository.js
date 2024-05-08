import mongoose from "mongoose";
import { orderSchema } from "./order.schema.js";


const OrderModel = mongoose.model("Order", orderSchema);
export default class OrderRepository {

    async getAll() {
        try {
            const order = await OrderModel.find().populate('product');
            let grandTotal = 0;

            cartItems.forEach(cartItem => {
                if (cartItem.productID && cartItem.productID.price) {
                    grandTotal += cartItem.productID.price;
                }
            })

            return { order, grandTotal };
        } catch (err) {
            console.log(err);
        }
    }

}