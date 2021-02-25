const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //Acquiring token from header
  const authHeader = req.get("Authorization");

  //checking if token exists in header
  if (!authHeader)
    return res.status(403).send({ message: "resource not avilable" });
  console.log(authHeader);

  //checking if token is expired or altered
  try {
    res.locals.decodedToken = await jwt.verify(
      authHeader.split(' ')[1],
      process.env.ADMIN_TOKEN_SECRET
    );
    next();
  } catch (error) {
    if (error)
      return res.status(403).send({ message: "resource not avilable" });
  }
};
