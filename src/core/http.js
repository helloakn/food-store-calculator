import express from 'express';
import { errorHandler } from 'app/core'

const APP = express();

APP.use(express.json());

const prototypes = {
    config: function () {
        let instance = this;
        if (typeof this === 'function')
            instance = Object.create(prototypes)
        return instance;
    },

    route: function (routers) {
        let instance = this;
        if (typeof this === 'function')
            instance = Object.create(prototypes)
        routers.forEach((route) => {
            APP.use(route)
        })
        return instance;
    },

    start: function (port) {
        let instance = this;

        if (typeof this === 'function') instance = Object.create(prototypes)

        errorHandler(APP)

        APP.listen(port, () => { console.log(`Server running on port : ${port}`) });
    }
}

function Main() {
    return function () {
        return Object.create(prototypes)
    }
}

export const SERVER = Object.assign(Main(), prototypes)
