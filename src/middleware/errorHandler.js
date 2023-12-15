// define error handler
module.exports = (error, req, res, next) => {
    const code = error.statusCode || 500;

    let data = {
        code: code,
        status: "error",
        error: error?.message,
    };

    if (code !== 422) {
        data = {
            code: code,
            status: "error",
            message: error.message
        };
    }

    res.json(data);
};
