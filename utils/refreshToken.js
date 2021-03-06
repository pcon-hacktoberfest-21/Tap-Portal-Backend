const jwt = require("jsonwebtoken");

const refreshToken = (token, email, isAdmin) => {
  let SECRET = process.env.TOKEN_SECRET;
  if (isAdmin === "admin") {
    SECRET = process.env.ADMIN_TOKEN_SECRET;
  }
  try {
    //Valid token
    const decoded = jwt.verify(token, SECRET);
    console.log("decoded", decoded);
    return token;
  } catch (err) {
    //expired token
    console.log("error", err);

    //issuing new token
    token = jwt.sign(
      {
        Email: email,
      },
      SECRET,
      { expiresIn: "1h" }
    );
    console.log(token);
    return token;
  }
};

module.exports = refreshToken;
