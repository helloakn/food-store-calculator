import { OrderFoodService } from 'app/services'
import { OrderFood } from 'app/models/order-food'


describe('OrderFoodService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('TEST "orderFood" function SHOULD return order informaing without calculation of discounts WHEN given useMemberCard is false', () => {
        // GIVEN
        const parameters = {
            deskNumber: '#1',
            items: [
                { item_set: "Red set", count: 1 },
                { item_set: "Green set", count: 2 },
                { item_set: "Yellow set", count: 2 }
            ],
            useMemberCard: false
        }
        //spy
        const spyFun_OrderFoodService_orderFood = jest.spyOn(OrderFoodService.prototype, 'orderFood')
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const orderFoodService = new OrderFoodService()
        const result = orderFoodService.orderFood(parameters)

        // THEN
        expect(spyFun_OrderFoodService_orderFood).toHaveBeenCalledTimes(1)
        expect(spyFun_OrderFoodService_orderFood).toHaveBeenCalledWith({
            deskNumber: '#1',
            items: [
                { item_set: "Red set", count: 1 },
                { item_set: "Green set", count: 2 },
                { item_set: "Yellow set", count: 2 }
            ],
            useMemberCard: false
        })
        expect(result).toEqual(expect.objectContaining(
            {
                deskNumber: '#1',
                totalPrice: 226,
                discountPercentage: 0,
                netPrice: 226
            }
        ))
        expect(spyFun_receive).toHaveBeenCalledTimes(3)
        expect(spyFun_manipulate).toHaveBeenCalledTimes(3)
    })

    test('TEST "orderFood" function SHOULD return order informaing without calculation of discounts WHEN given useMemberCard is true', () => {
        // GIVEN
        const parameters = {
            deskNumber: '#1',
            items: [
                { item_set: "Red set", count: 1 },
                { item_set: "Green set", count: 2 },
                { item_set: "Yellow set", count: 2 }
            ],
            useMemberCard: true
        }
        //spy
        const spyFun_OrderFoodService_orderFood = jest.spyOn(OrderFoodService.prototype, 'orderFood')
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const orderFoodService = new OrderFoodService()
        const result = orderFoodService.orderFood(parameters)

        // THEN
        expect(spyFun_OrderFoodService_orderFood).toHaveBeenCalledTimes(1)
        expect(spyFun_OrderFoodService_orderFood).toHaveBeenCalledWith({
            deskNumber: '#1',
            items: [
                { item_set: "Red set", count: 1 },
                { item_set: "Green set", count: 2 },
                { item_set: "Yellow set", count: 2 }
            ],
            useMemberCard: true
        })
        expect(result).toEqual(expect.objectContaining(
            {
                deskNumber: '#1',
                totalPrice: 226,
                discountPercentage: 10,
                netPrice: 203.4
            }
        ))
        expect(spyFun_receive).toHaveBeenCalledTimes(3)
        expect(spyFun_manipulate).toHaveBeenCalledTimes(3)
    })

})