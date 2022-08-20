const successResponse = (
    {
        h,
        data,
        status = 'success',
        message = 'Success',
        statusCode = 200,
        type = 'application/json',
    },
) => {
    return h.response({
        status: status,
        message: message,
        data: data,
    }).code(statusCode).type(type);
};

module.exports = successResponse;
