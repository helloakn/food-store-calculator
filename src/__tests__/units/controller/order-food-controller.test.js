import { OrderFoodService } from 'app/services'
import { orderFoodController } from 'app/controller';

const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() }

describe('orderFoodController', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('TEST "orderFood" function SHOULD call the  OrderFoodService.orderFood and return  response "OK" status through the Express Response', () => {
        // GIVEN
        const req = {
            body: {
                deskNumber: '#1',
                items: [
                    { item_set: "Red set", count: 1 },
                    { item_set: "Green set", count: 2 },
                    { item_set: "Yellow set", count: 2 }
                ],
                useMemberCard: false
            }
        }

        //spy
        const spyFun_OrderFoodService_orderFood = jest.spyOn(OrderFoodService.prototype, 'orderFood')

        // WHEN
        orderFoodController.orderFood(req, mockRes)

        // THEN
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.status).toHaveBeenCalledTimes(1)

        expect(mockRes.send).toHaveBeenCalledWith({
            status: 'OK',
            data: expect.objectContaining({
                "deskNumber": "#1",
                "discountPercentage": 0,
                "netPrice": 226,
                "totalPrice": 226,
                items: expect.arrayContaining([
                    {
                        "discountPercentage": 0,
                        "itemName": "Yellow set",
                        "netPrice": 100,
                        "orderCount": 2,
                        "pricePerItem": 50,
                        "totalPrice": 100,
                    }
                ])
            })
        })

        expect(spyFun_OrderFoodService_orderFood).toHaveBeenCalledTimes(1)
    })


})