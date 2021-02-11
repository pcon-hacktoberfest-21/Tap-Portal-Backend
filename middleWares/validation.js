const Joi = require("@hapi/joi");

//VALIDATE DATA OF ADMIN
const validateAdmin = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string()
      .min(6)
      .required()
      .email()
      .regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required(),
    branch: Joi.string().min(2).required(),
  });
  return schema.validate(req.body);
};
//VALIDATE LOGIN
const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email()
      .regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(req.body);
};

//VALIDATE DATA OF STUDENT
const validateStudent = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email()
      .regex(/nitjsr\.ac\.in$/),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(req.body);
};

//VALIDATE DATA OF NEW COMPANY
const validateNewCompany = (req) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(2).required(),
    mincgpa: Joi.number().min(5).max(10),
    dateofvisit: Joi.date().iso(),
    lastdateofapply: Joi.date().iso(),
    package: Joi.number(),
    description: Joi.string(),
    pdf: Joi.string(),
    branch:Joi.string()
  });
  return schema.validate(req.body);
};

//VALIDATE DATA OF UPDATE COMPANY
const validateUpdateCompany = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    mincgpa: Joi.number().min(5).max(10),
    dateofvisit: Joi.date().iso(),
    lastdateofapply: Joi.date().iso(),
    package: Joi.number(),
    description: Joi.string(),
    pdf: Joi.string(),
    branch:Joi.string()
  });
  return schema.validate(req.body);
};

//VALIDATE BRANCH DETAILS
const validateBranchDetails = (data) => {
  const schema = Joi.object({
  branch: Joi.array().items(Joi.string().valid('cse','me','ce','mme',''))
  });
  return schema.validate(data);
};

module.exports.validateAdmin = validateAdmin;
module.exports.validateLogin = validateLogin;
module.exports.validateStudent = validateStudent;
module.exports.validateNewCompany = validateNewCompany;
module.exports.validateUpdateCompany = validateUpdateCompany;
module.exports.validateBranchDetails = validateBranchDetails;
