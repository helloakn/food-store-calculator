import express from 'express';

const route = express.Router();

route.get('/health-check', (req, res) => {
    res.status(200).send('Healthy')
})

export default route
