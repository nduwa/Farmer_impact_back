import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth_token");
    if (!token) {
      return res.status(401).json({
        status: "Fail",
        message: "Please login to continue",
      });
    }

    const verified = Jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      req.user = verified;
      next(); // Call next() here if verification is successful
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Login to continue",
      });
    }
  } catch (err) {
    if (err.expiredAt && err.expiredAt < new Date()) {
      return res.status(401).json({
        status: "Fail",
        message: "Your token has expired, please login again",
      });
    } else {
      return res.status(400).json({
        status: "Fail",
        message: "Token is not valid",
      });
    }
  }
};

export default verifyToken;
