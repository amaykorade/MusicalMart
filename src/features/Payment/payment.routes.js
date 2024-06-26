import express from "express";
import PaymentController from "./payment.controller.js";
import dotenv from "dotenv"
import jwtAuth from "../../middlewares/jwt.middleware.js";

dotenv.config();

const paymentRouter = express.Router();
const paymentController = new PaymentController();


paymentRouter.get('/getkey', (req, res, next) => {
    paymentController.getKey(req, res, next);
})

paymentRouter.get('/getallorders', jwtAuth, (req, res, next) => {
    paymentController.getAllOrders(req, res, next);
})

paymentRouter.get('/getuserorders', jwtAuth, (req, res, next) => {
    paymentController.getUserOrders(req, res, next);
})

paymentRouter.post('/create-order', jwtAuth, (req, res, next) => {
    paymentController.createPaymentOrder(req, res, next);
});

paymentRouter.post('/paymentverification', jwtAuth, (req, res, next) => {
    paymentController.paymentVerification(req, res, next);
});



export default paymentRouter;