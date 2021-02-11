const loginAdmin = require("./admin/login");
const registerAdmin = require("./admin/register");
const logoutAdmin = require("./admin/logout");
const getCompanies = require("./admin/getCompanies");
const deleteCompany = require("./admin/deleteCompany");
const addCompany = require("./admin/addCompany");
const updateCompany = require("./admin/updateCompany");
const getCompanyById = require("./admin/getCompanyById");
const getCompaniesByBranch = require("./admin/getCompaniesByBranch");

module.exports = {
  //Login Admin
  login: loginAdmin,
  // Register Admin
  register: registerAdmin,
  //Logout Admin
  logout: logoutAdmin,
  //Get Companies
  companies: getCompanies,
  //Get Company by Id
  companyById: getCompanyById,
  //Delete Company by id
  deleteCompany: deleteCompany,
  //Add New Company
  addCompany: addCompany,
  // Update Company by id
  updateCompany: updateCompany,
  //Get Companies by Branch
  companiesByBranch: getCompaniesByBranch,
};
