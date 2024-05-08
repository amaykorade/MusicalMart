import mongoose from "mongoose";
import { cartSchema } from "./cart.schema.js";


const CartModel = mongoose.model("Cart", cartSchema);
export default class CartRepository {

    async getAll() {
        try {
            const cartItems = await CartModel.find().populate('productID');
            let grandTotal = 0;

            cartItems.forEach(cartItem => {
                if (cartItem.productID && cartItem.productID.price) {
                    grandTotal += cartItem.productID.price;
                }
            })

            return { cartItems, grandTotal };
        } catch (err) {
            console.log(err);
        }
    }

    async add(prodID) {
        console.log(prodID);
        try {
            const prodId = new mongoose.Types.ObjectId(prodID);
            const products = new CartModel({ productID: prodId });
            await products.save();
            return "Product added successfully";
        } catch (err) {
            console.log(err);
        }
    }

    async delete(prodID) {
        try {
            const existingProd = await CartModel.findById({ _id: prodID });
            if (existingProd) {
                const product = await CartModel.findByIdAndDelete({ _id: prodID });
                return "Product deleted successfully"
            } else {
                return "Product does not exist";
            }
        } catch (err) {
            console.log(err);
        }
    }
}