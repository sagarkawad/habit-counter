import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Ensure this is defined and secured

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(req.token, "secret");
    req.user = decoded; // Attach the decoded token to the request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
