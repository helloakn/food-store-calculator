export const ITEM_SETS = {
    "Red set": 50,
    "Green set": 40,
    "Blue set": 30,
    "Yellow set": 50,
    "Pink set": 80,
    "Purple set": 90,
    "Orange set": 120,
}

const prototypes = {
    fields: {
        item_set_name: '',
        count: 0
    },
    receive: function ({ itemSet, count }) {
        let instance = this;
        if (typeof this === 'function')
            instance = Object.create(prototypes)

        instance.fields = {
            item_set_name: itemSet,
            count
        }

        return instance
    },
    manipulate: function () {
        let instance = this;
        if (typeof this === 'function')
            instance = Object.create(prototypes)

        const { item_set_name, count } = instance.fields
        return {
            ...instance.fields,
            price_per_item: ITEM_SETS[item_set_name],
            total_price: ITEM_SETS[item_set_name] * count
        }
    }
}

const mainCalculator = {
    calculate: function () {
        return this;
    },
    generateBill: function () {
        console.error('this', this)
    }
}

function Main() {
    return function (orderItems) {
        const instance = Object.create(mainCalculator)
        instance.orderItems = orderItems
        return instance;
    }
}

export const OrderFood = Object.assign(Main(), prototypes)
