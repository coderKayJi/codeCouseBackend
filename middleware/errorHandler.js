const ErrorHandler = (err, req, res, next) => {
    const errStatus = err?.statusCode || 500;
    const errData = err?.data || []
    const errMsg = err || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        error: true,
        status: errStatus,
        message: errMsg?.message ?? errMsg,
        data: errData
        // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = ErrorHandler;
