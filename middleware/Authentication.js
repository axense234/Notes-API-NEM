const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const AuthenticationMiddleware = (err, req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Auth header does not exist or does not start with Bearer.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    console.log("OOPSIE", error);
    console.log("MONGOOSE", err);
  }
};

module.exports = { AuthenticationMiddleware };
