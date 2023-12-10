import { OrderFood } from 'app/models/order-food'

export class OrderFoodService {
    orderFood({
        deskNumber = '#1',
        items = [],
        useMemberCard = false
    }) {
        // const orders = [
        //     { item_set: "Red set", count: 1 },
        //     { item_set: "Green set", count: 2 },
        //     { item_set: "Yellow set", count: 2 }
        // ]
        console.error('service start')
        items = [
            { item_set: "Red set", count: 1 },
            { item_set: "Green set", count: 2 },
            { item_set: "Yellow set", count: 2 }
        ]
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