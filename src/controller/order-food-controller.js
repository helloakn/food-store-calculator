import { OrderFoodService } from 'app/services'
export const orderFoodController = {
    orderFood: (req, res) => {
        const orderFoodService = new OrderFoodService()
        const { deskNumber, items, useMemberCard } = req.body
        const data = orderFoodService.orderFood({ deskNumber, items, useMemberCard })

        res
            .status(200)
            .send({
                status: 'OK',
                data
            })
    }
}