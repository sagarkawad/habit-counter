"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
        if (token) {
            req.token = token; // Attach the token to the request object for further use
        }
        else {
            return res.status(401).json({ message: "Token is missing" });
        }
    }
    else {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    next();
};
exports.default = extractToken;
