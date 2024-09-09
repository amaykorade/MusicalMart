The Musical Mart

The Musical Mart is a full-featured e-commerce platform for selling musical instruments online. This platform allows users to browse through various musical instruments, add them to the cart, and make payments securely. The platform also supports user management and order processing.

Table of Contents

- Features
- Tech Stack
- Setup and Installation
- Environment Variables
- API Endpoints
- User Management
- Products
- Cart
- Orders
- Payment
- Middlewares

- Features
  User Authentication: Secure JWT-based user login and registration.
  Product Management: Add, update, delete, and filter products.
  Cart Management: Add to cart, remove from cart, and view cart items.
  Order Management: Place orders, view user-specific orders, and view all orders (admin only).
  Payment Integration: Integrated with Razorpay for secure online payments.
  Admin Controls: Admin can manage products and view all user orders.

- Tech Stack
  - Backend: Node.js, Express.js
  - Database: MongoDB with Mongoose
  - Payment Gateway: Razorpay
  - Environment Management: dotenv
  - Security: JWT (JSON Web Tokens), crypto
  - Other Libraries: Multer (for file uploads), Razorpay SDK

- Setup and Installation

  - Clone the repository:
  - git clone https://github.com/yourusername/the-musical-mart.git
  - cd the-musical-mart

- Install dependencies:
  - npm install
  - Set up environment variables (see Environment Variables).

- Start the server:
  - npm start
  - Server will run on http://localhost:3000 by default.

- Environment Variables
  - Create a .env file in the root directory and add the following environment variables:
  - DB_URL=<Your MongoDB connection URL>
  - PAYMENT_KEY_ID=<Your Razorpay Key ID>
  - PAYMENT_KEY_SECRET=<Your Razorpay Key Secret>
  - JWT_SECRET=<Your JWT Secret Key>

- API Endpoints

  - User Management
    - Register User: POST /api/users/register
    - Login User: POST /api/users/login
    - Get User Details: GET /api/users/me (requires JWT token)

  - Products
    - Get All Products: GET /api/products
    - Add New Product: POST /api/products (Admin only)
    - Update Product: PUT /api/products/:id (Admin only)
    - Delete Product: DELETE /api/products/:id (Admin only)
    - Filter Products: GET /api/products?filter=<filter criteria>

  - Cart
    - Get Cart Items: GET /api/cart
    - Add to Cart: POST /api/cart
    - Remove from Cart: DELETE /api/cart/:prodId

  - Orders
    - Create Order: POST /api/orders
    - Get User Orders: GET /api/orders/user
    - Get All Orders: GET /api/orders (Admin only)

  - Payment
    - Get Razorpay Key: GET /api/payment/getkey
    - Create Payment Order: POST /api/payment/create-order
    - Verify Payment: POST /api/payment/paymentverification
    - Get All Orders: GET /api/payment/getallorders (Admin only)
    - Get User Orders: GET /api/payment/getuserorders

  - Middlewares
    - JWT Authentication: Used to protect routes that require user authentication.
    - Multer: Used for handling file uploads, such as product images.
