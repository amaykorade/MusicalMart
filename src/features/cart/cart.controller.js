import CartRepository from "./cart.repository.js";

export default class CartController {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.cartRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

    async addToCart(req, res) {
        try {
            const prodID = req.params.prodId;
            const products = await this.cartRepository.add(prodID);
            res.status(201).send(products);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

    async deleteProd(req, res) {
        try {
            const prodId = req.params.prodId;
            const product = await this.cartRepository.delete(prodId);
            if (!product) {
                res.status(404).send("Product not found");
            } else {
                res.status(200).send(product);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }
}