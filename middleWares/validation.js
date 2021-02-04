const Joi = require("@hapi/joi");

//VALIDATE DATA OF ADMIN 
const validateAdmin = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email().regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required(),
    branch: Joi.string().min(2).required()
  });
  return (schema.validate(req.body));

};
//VALIDATE LOGIN
const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required()
  });
  return (schema.validate(req.body));

};

//VALIDATE DATA OF STUDENT 
const validateStudent = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required()
  });
  return (schema.validate(req.body));

};

module.exports.validateAdmin = validateAdmin;
module.exports.validateLogin = validateLogin;
module.exports.validateStudent = validateStudent;
