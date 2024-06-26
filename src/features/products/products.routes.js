import express from 'express';
import ProductController from './products.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get('/filter', (req, res, next) => {
    productController.filterProd(req, res, next)
})


productRouter.get('/', (req, res, next) => {
    productController.getAll(req, res, next)
})

productRouter.get('/:id', (req, res, next) => {
    productController.getbyId(req, res, next)
})


productRouter.post('/', upload.single('imageUrl'), jwtAuth, (req, res, next) => {
    productController.addProduct(req, res, next)
})

productRouter.post('/rate/:prodId', (req, res, next) => {
    productController.rateProduct(req, res, next)
})


productRouter.delete('/:productId', jwtAuth, (req, res, next) => {
    productController.delete(req, res, next)
})

productRouter.put('/:prodId', jwtAuth, (req, res, next) => {
    productController.update(req, res, next)
})


export default productRouter;