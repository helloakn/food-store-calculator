import express from 'express';
import { orderFoodController } from 'app/controller';

const route = express.Router();

route.get('/order-food', orderFoodController.orderFood)

export default route
