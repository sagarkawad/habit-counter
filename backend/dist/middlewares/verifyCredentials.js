"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const User = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const verifyCredentials = (req, res, next) => {
    const user = User.safeParse(req.body);
    if (!user.success) {
        res.status(404).json({ msg: "provide better inputs" });
    }
    else {
        next();
    }
};
exports.default = verifyCredentials;
