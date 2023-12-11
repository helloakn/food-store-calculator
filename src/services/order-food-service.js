import { OrderFood } from 'app/models/order-food'

export class OrderFoodService {
    orderFood({
        deskNumber,
        items,
        useMemberCard
    }) {
        const orderItems = items.map(orderItem => {
            const { item_set: itemName, count: orderCount } = orderItem
            return OrderFood
                .receive({ itemName, orderCount })
                .manipulate()
        })
        const result = OrderFood(orderItems)
            .calculate(useMemberCard)
            .generateBill(deskNumber)

        return result;
    }
}