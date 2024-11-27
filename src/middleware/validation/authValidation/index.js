// Import everything from both modules
const userSchema = require('./userSchema');
const userValidation = require('./userValidation');

// Combine and export everything
module.exports = {
  ...userSchema,
  ...userValidation,
}