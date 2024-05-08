import ProductRepository from "./products.repository.js";

export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAll(req, res) {
        try {
            const prod = await this.productRepository.getAll();
            res.status(200).send(prod);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error")
        }
    }

    async addProduct(req, res) {
        const userID = req.userID;
        const image = req.file.filename;
        const prod = req.body;
        prod.imageUrl = image;
        try {
            const products = await this.productRepository.add(userID, prod);
            res.status(201).send(products);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error")
        }
    }

    async filterProd(req, res) {
        try {
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const company = req.query.company;
            const result = await this.productRepository.filter(
                minPrice,
                maxPrice,
                category,
                company
            );
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }


    async update(req, res) {
        try {
            const userID = req.userID;
            const prodID = req.params.prodId;
            const prod = req.body;
            const product = await this.productRepository.update(userID, prodID, prod);
            if (!product) {
                return res.status(404).send("Product not found");
            }
            res.status(200).send(product);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

    async rateProduct(req, res) {
        try {
            const userID = req.userID;
            const prodID = req.params.prodId;
            const rating = req.body.rating;
            const result = await this.productRepository.rate(userID, prodID, rating);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            const userID = req.userID;
            const prodID = req.params.prodId;
            const product = await this.productRepository.delete(userID, prodID);
            if (!product) {
                return res.status(404).send("Product not found");
            }
            res.status(200).send(product);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

}