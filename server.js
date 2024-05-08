import express from 'express';
import dotenv from 'dotenv';

import { connectUsingMongoose } from './src/config/mongooseConfig.js';

// import routers
import productRouter from './src/features/products/products.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import orderRouter from './src/features/order/order.routes.js';

const server = express();

server.use(express.json());

dotenv.config();

// CORS policy configuration
server.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        'http://localhost:3000'
    );
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // return ok for preflight request.
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

// routes
server.use('/api/products', productRouter);
server.use('/api/user', userRouter);
server.use('/api/cart', cartRouter);
server.use('/api/order', orderRouter);

server.listen(3000, () => {
    console.log("Server is running at 3000");
    connectUsingMongoose();
})