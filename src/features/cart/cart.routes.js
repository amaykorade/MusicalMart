import express from "express";
import CartController from "./cart.controller.js";

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.get('/', (req, res) => {
    cartController.getAllProducts(req, res)
})

cartRouter.post('/', (req, res) => {
    cartController.addToCart(req, res)
})

cartRouter.delete('/:prodId', (req, res) => {
    cartController.deleteProd(req, res)
})

export default cartRouter;