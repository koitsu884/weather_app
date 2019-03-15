const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    }
});

function validatePostInput(data) {
  let errors = {};
  
  if (!data.name || data.name === '') {
    errors.name = "Name field is required";
  }
  if (!data.country || data.country === '') {
    errors.country = "Country field is required";
  }
  
  return {
      errors,
      isValid: Object.keys(errors).length === 0
  }
} 

exports.City = mongoose.model('city', CitySchema);
exports.validateInput = validatePostInput;