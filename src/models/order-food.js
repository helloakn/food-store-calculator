export const ITEM_SETS = {
    "Red set": 50,
    "Green set": 40, //
    "Blue set": 30,
    "Yellow set": 50,
    "Pink set": 80, //
    "Purple set": 90,
    "Orange set": 120, //
}
const ADDITIONAL_DISCOUNT_ITEMS = [
    'Green set',
    'Pink set',
    'Orange set',
]
const ADDITIONAL_DISCOUNT_PERCENTAGE = 5

const DISCOUNT = 10
const MEMBER_DISCOUNT_PERCENTAGE = 10
const PERCENTAGE_MULTIPLIER = 100

const itemPrototypes = {
    itemName: '',
    orderCount: 0,
    pricePerItem: 0,
    totalPrice: 0,
    discountPercentage: 0,
    netPrice: 0,

    hasDiscount: function () {
        return ADDITIONAL_DISCOUNT_ITEMS.includes(this.itemName) && this.orderCount >= 2
    },

    receive: function ({ itemName, orderCount }) {
        return Object.create({ ...this, itemName, orderCount })
    },

    manipulate: function () {
        const { itemName, orderCount } = this
        const pricePerItem = ITEM_SETS[itemName]
        const totalPrice = pricePerItem * orderCount
        const discountPercentage = this.hasDiscount() ? ADDITIONAL_DISCOUNT_PERCENTAGE : 0
        const netPrice = totalPrice - (totalPrice * discountPercentage / PERCENTAGE_MULTIPLIER)
        return { ...this, itemName, pricePerItem, totalPrice, discountPercentage, netPrice, orderCount }
    }
}

const billingPrototypes = {
    items: [],
    deskNumber: '',

    calculate: function (hasMemebrCard) {
        const totalPrice = this.items.reduce((accumulator, object) => accumulator + object.netPrice, 0)
        const discountPercentage = hasMemebrCard ? MEMBER_DISCOUNT_PERCENTAGE : 0
        const discountPrice = (totalPrice * discountPercentage / PERCENTAGE_MULTIPLIER)
        const netPrice = totalPrice - discountPrice
        return { ...this, totalPrice, discountPercentage, netPrice }
    },
    generateBill: function (deskNumber) {
        return { ...this, deskNumber }
    }
}

function Main() {
    return function (items) {
        return { ...billingPrototypes, items }
    }
}

export const OrderFood = Object.assign(Main(), itemPrototypes)
