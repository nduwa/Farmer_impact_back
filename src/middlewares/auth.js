import Jwt from 'jsonwebtoken';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header("auth_token");

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            Message: "Please login to continue"
        });
    }

    try {
        const verified = Jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            req.user = verified;
        } else {
            res.status(401).json({
                status: "fail",
                Message: "Login to continue"
            });
        }
    } catch (err) {
        if (err.expiredAt && err.expiresAt < new Date()) {
            res.status(401).json({
                status: "Fail",
                Message: "Your token has expired, please login again"
            });
        } else {
            res.status(400).json({
                status: 'Fail',
                Message: "Token is not valid"
            });
        }
    }

    // Move next() outside of the catch block
    next();
};

export default verifyToken;