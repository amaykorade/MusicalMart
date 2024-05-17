import mongoose from "mongoose";
import { productSchema } from "./products.schema.js";
import { UserModel } from "../user/user.repository.js";

const ProductModel = mongoose.model('Products', productSchema);

export default class ProductRepository {

    async getAll() {
        try {
            const prod = await ProductModel.find();
            return prod;
        } catch (err) {
            console.log(err);
        }
    }

    async add(userID, prod) {
        try {
            const user = await UserModel.findById(userID);
            console.log(user)
            // if (user.isAdmin == true) {
            const newProd = new ProductModel(prod);
            await newProd.save();
            return newProd;
            // } else {
            // return "you are not the admin to do the task"
            // }

        } catch (err) {
            console.log(err);
        }
    }

    async filter(minPrice, maxPrice, category, company) {
        try {
            const filter = {};

            if (minPrice !== undefined && maxPrice !== undefined) {
                filter.price = { $gte: minPrice, $lte: maxPrice }
            } else if (minPrice !== undefined) {
                filter.price = { $gte: minPrice }
            } else if (maxPrice !== undefined) {
                filter.price = { $lte: maxPrice }
            }

            if (category !== undefined) {
                filter.category = category
            }
            if (company !== undefined) {
                filter.company = company
            }

            const filterProducts = await ProductModel.find(filter);
            return filterProducts;
        } catch (err) {
            console.log(err);
        }
    }

    async update(userID, prodID, prod) {
        console.log(prod)
        try {
            const user = await UserModel.findById(userID);
            console.log(user)
            if (user.isAdmin == true) {
                const query = {
                    _id: new mongoose.Types.ObjectId(prodID)
                }
                const update = { $set: prod }
                const updateProd = await ProductModel.findOneAndUpdate(query, update, { new: true });
                return updateProd;
            } else {
                return "You are not the admin to do the task"
            }

        } catch (err) {
            console.log(err);
        }
    }


    // not working properly

    // async rate(userID, prodID, rating) {
    //     try {
    //         const product = await ProductModel.findById(prodID);
    //         if (!product) {
    //             throw new Error('Product not found');
    //         }

    //         if (!Array.isArray(product.rating)) {
    //             product.rating = [];
    //         }

    //         product.rating.push({
    //             userId: userID,
    //             rating: rating
    //         })

    //         await product.save();
    //         return "Rating added successfully"
    //     } catch (err) {
    //         console.log(err)
    //         throw err;
    //     }
    // }

    async delete(userID, prodID) {
        try {
            const user = await UserModel.findById(userID);
            console.log(user)
            if (user.isAdmin == true) {
                const query = {
                    _id: new mongoose.Types.ObjectId(prodID)
                }
                await ProductModel.findOneAndDelete(query);
                return "Product deleted successfully";
            } else {
                return "You are not the admin to do the task";
            }

        } catch (err) {
            console.log(err);
        }
    }

}