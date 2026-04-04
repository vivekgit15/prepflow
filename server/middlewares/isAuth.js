import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "No token, access denied"
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    console.log("Auth error:", error.message);

    return res.status(401).json({
      message: "Token verification failed"
    });
  }
};

export default isAuth;