import mongoose from "mongoose";
import { cartSchema } from "./cart.schema.js";


const CartModel = mongoose.model("Cart", cartSchema);
export default class CartRepository {

    async getAll(userId) {
        try {
            const cartItems = await CartModel.find({ userID: userId }).populate('productID');
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

    async add({ productID, userId }) {
        console.log("prodID:", productID);
        try {
            // Basic validation: Check if prodID is a valid ObjectId string
            if (!mongoose.Types.ObjectId.isValid(productID)) {
                throw new Error('Invalid prodID');
            }

            const productId = new mongoose.Types.ObjectId(productID);
            const userObjectId = new mongoose.Types.ObjectId(userId);
            // console.log(prodId)
            const products = new CartModel({ productID: productId, userID: userObjectId });
            await products.save();
            return "Product added successfully";
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async delete({ productId, userId }) {
        try {
            const existingProd = await CartModel.findOne({ _id: productId, userID: userId });
            if (existingProd) {
                const product = await CartModel.findByIdAndDelete(productId);
                return "Product deleted successfully"
            } else {
                return "Product does not exist";
            }
        } catch (err) {
            console.log(err);
        }
    }
}