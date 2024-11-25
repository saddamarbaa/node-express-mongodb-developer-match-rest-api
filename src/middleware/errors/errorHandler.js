const errorHandlerMiddleware= (
  error,
  req,
  res,
  next
) => {
  const statusCode = error.statusCode || 500;
  res?.status(statusCode).send({
    data: null,
    success: false,
    error: true,
    message: error.message || 'Internal Server Error',
    status: statusCode,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
};


module.exports =  errorHandlerMiddleware