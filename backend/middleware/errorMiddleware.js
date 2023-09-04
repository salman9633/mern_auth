const notFound = (req, res, next) => {//url req not found error
    const error = new Error(`Not Found :${req.orignalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {//custom error handling middleware
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {//Handling a type of error that can be produced by mongoose 
        statusCode = 404;
        message = 'Resource Not Found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //it will shoe us the error stack in our code in dev/local (line num etc...)
    });
}

export {notFound, errorHandler}