// models/contactValidation.js
const Joi = require('joi');

const validateContact = (contact) => {
  const schema = Joi.object({
    fname: Joi.string().min(1).required(),
    lname: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    birthday: Joi.date().required(),
  });

  return schema.validate(contact);
};

module.exports = { validateContact };