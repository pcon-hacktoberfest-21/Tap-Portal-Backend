const pastActivity = require("../../utils/pastActivity");
module.exports = async (req, res) => {
  const email = res.locals.decodedToken.Email;
  const result = pastActivity(res, email, true);
};
