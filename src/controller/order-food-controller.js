import { OrderFoodService } from 'app/services'
export const orderFoodController = {
    orderFood: (req, res) => {
        const orderFoodService = new OrderFoodService()
        const data = orderFoodService.orderFood({})
        res
            .status(200)
            .send({
                status: 'OK',
                data
            })
    }
}