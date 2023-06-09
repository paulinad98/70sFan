const jwt = require("jsonwebtoken");

const JWT_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({
      ok: false,
      error: "Access denied. No token provided",
    });
  }

  console.log(token)

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      ok: false,
      error: "Token expired",
    });
  }

  next();
};
