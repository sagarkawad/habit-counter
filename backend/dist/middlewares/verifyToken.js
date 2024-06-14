"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "your_jwt_secret"; // Ensure this is defined and secured
const verifyToken = (req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(req.token, "secret");
        req.user = decoded; // Attach the decoded token to the request object
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.default = verifyToken;
