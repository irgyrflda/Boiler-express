//Handle Respons Json
exports.jsonFormat = (res, statusCode, status, msg, data = [], meta) => {
  if (status === "success") {
    res.json({
      statusCode: statusCode,
      status: "success",
      message: msg,
      data: data,
      meta: meta,
    });
  }

  if (status === "failed") {
    res.json({
      statusCode: statusCode,
      status: "failed",
      message: msg,
      data: data,
    });
  }

  if (status === "datanull") {
    res.json({
      statusCode: statusCode,
      status: "datanull",
      message: msg,
      data: data,
    });
  }
};

exports.throwError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
