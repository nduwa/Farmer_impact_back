import Jwt from "jsonwebtoken";

const verifyRole = (req, res, next) => {
  const token = req.header("auth_token");

  if (!token) {
    return res.status(401).json({
      status: "Fail",
      message: "Login first to continue",
    });
  }

  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", req.user.staff);

    const userRole = req.user?.staff?.Role;
    console.log("User role:", userRole);

    if (
      userRole !== "System Admin" &&
      userRole !== "Field Officer" &&
      userRole !== "Washing Station Manager"
    ) {
      return res.status(403).json({
        status: "Fail",
        message: "You are not allowed to perform this action",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

export default verifyRole;
