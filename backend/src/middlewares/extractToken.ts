import express, { Request, Response, NextFunction } from "express";

const extractToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
    if (token) {
      req.token = token; // Attach the token to the request object for further use
    } else {
      return res.status(401).json({ message: "Token is missing" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  next();
};

// Adding the token field to the Request interface
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: any;
    }
  }
}

export default extractToken;
