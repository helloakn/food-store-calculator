import { ERRORS } from 'app/lib/errors';

export const errorHandler = (APP) => {
    const errorHandler = (err, req, res, next) => {
        const { code, ...error } = err
        const ERROR_CODE = err.code || 500
        console.error('err', err)
        res.status(ERROR_CODE).send(error)
    }

    APP.get('*', (...arg) => { throw ERRORS.NOT_FOUND_ERROR });

    APP.post('*', (...arg) => { throw ERRORS.NOT_FOUND_ERROR });

    APP.use(errorHandler)
}