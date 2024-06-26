import CartRepository from "./cart.repository.js";

export default class CartController {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getAllProducts(req, res) {
        try {
            const userId = req.userID;
            const products = await this.cartRepository.getAll(userId);
            res.status(200).send(products);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch cart items' });
        }
    }

    async addToCart(req, res) {
        const userId = req.userID;
        console.log("userId: ", userId);
        const { productID } = req.body;
        console.log("Product ID received in controller:", productID);
        try {
            const products = await this.cartRepository.add({ productID, userId });
            res.status(201).json("added successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to add product to cart' });
        }
    }

    async deleteProd(req, res) {
        try {
            const userId = req.userID;
            const productId = req.params.prodId;
            const product = await this.cartRepository.delete({ productId, userId });
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