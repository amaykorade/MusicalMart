import PaymentRepository from "./payment.repository.js";
import crypto from 'crypto';

export default class PaymentController {

    constructor() {
        this.paymentRepository = new PaymentRepository();
    };

    async getKey(req, res) {
        try {
            console.log("get key called")
            const key = process.env.PAYMENT_KEY_ID;
            res.status(200).json({ "key": key });
            console.log("Key: ", key);
        } catch (error) {
            console.error("Error in getKey: ", error);
            res.status(500).json({ error: error.message });
        }
    };

    async getAllOrders(req, res) {
        try {
            const userID = req.userID;
            const orders = await this.paymentRepository.getAllOrders(userID);
            res.status(200).send(orders);
        } catch (error) {
            console.error("Error getting all orders: ", error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUserOrders(req, res) {
        try {
            const userID = req.userID;
            const orders = await this.paymentRepository.getUserOrders(userID);
            res.status(200).send(orders);
        } catch (error) {
            console.error("Error getting all orders: ", error);
            res.status(500).json({ error: error.message });
        }
    }


    async createPaymentOrder(req, res) {
        console.log("createPaymentOrder called with body: ", req.body);
        const { amount, productsId } = req.body;
        const userId = req.userID;
        // console.log(amount);
        try {
            const order = await this.paymentRepository.createOrder(amount, productsId, userId);
            res.status(201).send(order);
            console.log("Order: ", order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async paymentVerification(req, res) {
        console.log("paymentVerification called with body: ", req.body);
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;
        const userId = req.userID;
        // console.log("cart: ", cartItems.productID)

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.log("Invalid request: missing parameters");
            return res.status(400).json({
                success: false,
                message: "Invalid request",
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;
        console.log("Signature is authentic: ", isAuthentic);
        if (isAuthentic) {
            try {

                const productIDs = cartItems.map(item => item.productID._id);
                // console.log('ids :', productIDs)

                const paymentDetails = {
                    userId,
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    productIDs,
                };
                console.log('Payment details: ', paymentDetails);
                await this.paymentRepository.savePaymentDetails(paymentDetails);

                res.status(200).json({ success: true, message: "Payment verified and saved" });
            } catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }
    }

}