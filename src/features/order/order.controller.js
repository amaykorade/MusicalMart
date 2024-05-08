import OrderRepository from "./order.repository.js";


export default class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.cartRepository.getAll();
            res.status(200).send(orders);
        } catch (err) {
            console.log(err);
        }
    }

}