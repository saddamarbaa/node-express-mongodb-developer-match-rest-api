const connectionRequestSchema = require('./connectionRequestSchema');
const sendConnectionRequestValidation = require('./connectionRequestValidation');

module.exports = {
  ...connectionRequestSchema,
  ...sendConnectionRequestValidation,
}