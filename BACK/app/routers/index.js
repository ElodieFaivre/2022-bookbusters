const { Router } = require('express');
const ApiError = require('../errors/apiError');
const handleError = require('../middlewares/handleError');
const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');

const router = Router();

router.use('/v1', bookRouter, userRouter);

router.use(() => {
    throw new ApiError('Endpoint not found', 404);
});

router.use(handleError);

module.exports = router;
