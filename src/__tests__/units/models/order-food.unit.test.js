import { OrderFood } from 'app/models/order-food'
describe('OrderFood', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('TEST "receive" function SHOULD save data and return instance as the object WHEN being passed the object', () => {
        // GIVEN
        const items = { itemName: "Red set", orderCount: 1 }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')

        // WHEN
        const obj = OrderFood.receive(items)

        // THEN
        expect(obj).toEqual(expect.objectContaining({ itemName: "Red set", orderCount: 1 }))
        expect(obj.manipulate).toEqual(OrderFood.manipulate)
        expect(obj).toEqual({})
        expect(obj.itemName).toEqual("Red set")
        expect(obj.orderCount).toEqual(1)
        expect(spyFun_receive).toHaveBeenCalledTimes(1)
    })

    test('TEST "manipulate" function SHOULD generate item object WHEN being passed the object to "receive" and method chaining to manipulate', () => {
        // GIVEN
        const items = { itemName: "Red set", orderCount: 2 }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const obj = OrderFood.receive(items).manipulate()

        // THEN
        expect(obj).toEqual(expect.objectContaining({ itemName: "Red set", orderCount: 2 }))
        expect(obj.itemName).toEqual("Red set")
        expect(obj.orderCount).toEqual(2)
        expect(obj.pricePerItem).toEqual(50)
        expect(obj.totalPrice).toEqual(100)
        expect(obj.discountPercentage).toEqual(0)

        expect(spyFun_receive).toHaveBeenCalledTimes(1)
        expect(spyFun_manipulate).toHaveBeenCalledTimes(1)
    })
    test('TEST "manipulate" function SHOULD generate item object WHEN being applied to object', () => {
        // GIVEN
        const items = { itemName: "Red set", orderCount: 2, hasDiscount: () => false }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const obj = OrderFood.manipulate.apply(items)

        // THEN
        expect(obj).toEqual(expect.objectContaining({ itemName: "Red set", orderCount: 2 }))
        expect(obj.itemName).toEqual("Red set")
        expect(obj.orderCount).toEqual(2)
        expect(obj.pricePerItem).toEqual(50)
        expect(obj.totalPrice).toEqual(100)
        expect(obj.discountPercentage).toEqual(0)

        expect(spyFun_receive).toHaveBeenCalledTimes(0)
        expect(spyFun_manipulate).toHaveBeenCalledTimes(1)
    })

    test('TEST "manipulate" function SHOULD generate item object including discountPercentage:5 WHEN object hasDiscount is true', () => {
        // GIVEN
        const items = { itemName: "Red set", orderCount: 2, hasDiscount: () => true }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const obj = OrderFood.manipulate.apply(items)

        // THEN
        expect(obj).toEqual(expect.objectContaining({ discountPercentage: 5 }))
        expect(obj.discountPercentage).toEqual(5)

        expect(spyFun_receive).toHaveBeenCalledTimes(0)
        expect(spyFun_manipulate).toHaveBeenCalledTimes(1)
    })
    test('TEST "hasDiscount" function SHOULD return false WHEN givin itemname does not includes in ADDITIONAL_DISCOUNT_ITEMS', () => {
        // GIVEN
        const items = { itemName: "Red set" }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const obj = OrderFood.hasDiscount.apply(items)

        // THEN
        expect(obj).toEqual(false)
    })
    test('TEST "hasDiscount" function SHOULD return true WHEN givin itemname  includes in ADDITIONAL_DISCOUNT_ITEMS and orderCount is 2 or more', () => {
        // GIVEN
        const items = { itemName: "Green set", orderCount: 2 }

        // spy
        const spyFun_receive = jest.spyOn(OrderFood, 'receive')
        const spyFun_manipulate = jest.spyOn(OrderFood, 'manipulate')

        // WHEN
        const obj = OrderFood.hasDiscount.apply(items)

        // THEN
        expect(obj).toEqual(true)
    })

    test('TEST "Main" function SHOULD generate object including the function WHEN bessing passed the object', () => {
        // GIVEN
        const orderItems = [
            {
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            },
            {
                itemName: 'Green set',
                pricePerItem: 40,
                totalPrice: 80,
                discountPercentage: 5,
                netPrice: 76,
                orderCount: 2
            },
            {
                itemName: 'Yellow set',
                pricePerItem: 50,
                totalPrice: 100,
                discountPercentage: 0,
                netPrice: 100,
                orderCount: 2
            }
        ]


        // WHEN
        const obj = OrderFood(orderItems)

        // THEN
        expect(typeof obj.calculate).toEqual('function')
        expect(typeof obj.generateBill).toEqual('function')
        expect(obj).toEqual(expect.objectContaining({
            items: expect.arrayContaining([{
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            }])
        }))
    })

    test('TEST "calculate" function SHOULD calculate total price, discount percentage etc WHEN given', () => {
        // GIVEN
        const orderItems = [
            {
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            },
            {
                itemName: 'Green set',
                pricePerItem: 40,
                totalPrice: 80,
                discountPercentage: 5,
                netPrice: 76,
                orderCount: 2
            },
            {
                itemName: 'Yellow set',
                pricePerItem: 50,
                totalPrice: 100,
                discountPercentage: 0,
                netPrice: 100,
                orderCount: 2
            }
        ]

        // WHEN
        const obj = OrderFood(orderItems).calculate()
        // THEN
        expect(typeof obj.calculate).toEqual('function')
        expect(typeof obj.generateBill).toEqual('function')
        expect(obj).toEqual(expect.objectContaining({
            totalPrice: 226,
            discountPercentage: 0,
            netPrice: 226
        }))
        expect(obj).toEqual(expect.objectContaining({
            items: expect.arrayContaining([{
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            }])
        }))
    })

    test('TEST "calculate" function SHOULD calculate discount and netPrice etc WHEN hasMemebrCard flag is true', () => {
        // GIVEN
        const hasMemebrCard = true
        const orderItems = [
            {
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            },
            {
                itemName: 'Green set',
                pricePerItem: 40,
                totalPrice: 80,
                discountPercentage: 5,
                netPrice: 76,
                orderCount: 2
            },
            {
                itemName: 'Yellow set',
                pricePerItem: 50,
                totalPrice: 100,
                discountPercentage: 0,
                netPrice: 100,
                orderCount: 2
            }
        ]

        // WHEN
        const obj = OrderFood(orderItems).calculate(hasMemebrCard)
        // THEN
        expect(typeof obj.calculate).toEqual('function')
        expect(typeof obj.generateBill).toEqual('function')
        expect(obj).toEqual(expect.objectContaining({
            totalPrice: 226,
            discountPercentage: 10,
            netPrice: 203.4
        }))
        expect(obj).toEqual(expect.objectContaining({
            items: expect.arrayContaining([{
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            }])
        }))
    })

    test('TEST "generateBill" function SHOULD put the deskNumber into object WHEN being passed the deskNumber', () => {
        // GIVEN
        const hasMemebrCard = true
        const orderItems = [{
            itemName: 'Red set',
            pricePerItem: 50,
            totalPrice: 50,
            discountPercentage: 0,
            netPrice: 50,
            orderCount: 1
        },
        {
            itemName: 'Green set',
            pricePerItem: 40,
            totalPrice: 80,
            discountPercentage: 5,
            netPrice: 76,
            orderCount: 2
        },
        {
            itemName: 'Yellow set',
            pricePerItem: 50,
            totalPrice: 100,
            discountPercentage: 0,
            netPrice: 100,
            orderCount: 2
        }]

        // WHEN
        const obj = OrderFood(orderItems).calculate(hasMemebrCard).generateBill('#DESK001')

        // THEN
        expect(typeof obj.calculate).toEqual('function')
        expect(typeof obj.generateBill).toEqual('function')
        expect(obj).toEqual(expect.objectContaining({
            deskNumber: '#DESK001',
            totalPrice: 226,
            discountPercentage: 10,
            netPrice: 203.4
        }))
        expect(obj).toEqual(expect.objectContaining({
            items: expect.arrayContaining([{
                itemName: 'Red set',
                pricePerItem: 50,
                totalPrice: 50,
                discountPercentage: 0,
                netPrice: 50,
                orderCount: 1
            }])
        }))
    })
})