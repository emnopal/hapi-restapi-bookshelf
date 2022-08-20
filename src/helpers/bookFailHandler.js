const failResponse = (
    {
        h,
        status = 'fail',
        message = 'Fail',
        statusCode = 500,
        type = 'application/json',
    },
) => {
    return h.response({
        status: status,
        message: message,
    }).code(statusCode).type(type);
};

module.exports = failResponse;
