import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    inStock: Number,
    category: String,
    company: String,
    imageUrl: String,
    rating: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number
    }
})