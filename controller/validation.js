const Joi = require("@hapi/joi");
const mysql = require("../util/db");

//VALIDATE DATA FUNCTION
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    branch: Joi.string().min(2).required()
  });
  return (schema.validate(req.body));

};

module.exports.validate = validate;
