"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const extractToken_1 = __importDefault(require("./middlewares/extractToken"));
const verifyToken_1 = __importDefault(require("./middlewares/verifyToken"));
const checkUser_1 = __importDefault(require("./middlewares/checkUser"));
const verifyCredentials_1 = __importDefault(require("./middlewares/verifyCredentials"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const JWT_SECRET = "secret";
// Function to check if Prisma Client is initialized correctly
const checkPrismaConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Perform a simple query to check the connection
        yield prisma.$connect();
        console.log("Prisma Client initialized successfully.");
    }
    catch (error) {
        console.error("Error initializing Prisma Client:", error);
    }
});
// Call the function to check the connection
checkPrismaConnection();
// Function to hash a password
function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate a salt
            const salt = yield bcrypt_1.default.genSalt(10);
            // Hash the password with the salt
            const hashedPassword = yield bcrypt_1.default.hash(plainPassword, salt);
            return hashedPassword;
        }
        catch (err) {
            console.error("Error hashing password:", err);
            throw err;
        }
    });
}
// Example function to check passwords
function checkPassword(inputPassword, storedHashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!storedHashedPassword) {
            console.error("Stored hashed password is undefined.");
            return false;
        }
        try {
            const match = yield bcrypt_1.default.compare(inputPassword, storedHashedPassword);
            return match;
        }
        catch (error) {
            console.error("Error comparing passwords:", error);
            throw error;
        }
    });
}
app.post("/register", verifyCredentials_1.default, checkUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = yield hashPassword(req.body.password);
    //   console.log(email, password, token);
    try {
        const response = yield prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });
        res.status(201).json({ msg: "user successfully created" });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const response = yield prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: username,
                    },
                    {
                        email: username,
                    },
                ],
            },
        });
        if (!response) {
            res.status(500).json({ msg: "user does not exists" });
            return;
        }
        console.log(response);
        const passResponse = yield checkPassword(password, response === null || response === void 0 ? void 0 : response.password);
        if (passResponse) {
            const User = {
                username: response.username,
                email: response.email,
                id: response.id,
            };
            const token = jsonwebtoken_1.default.sign(User, JWT_SECRET);
            res.json({ token });
        }
        else {
            res.json({ msg: "incorrect password" });
        }
    }
    catch (err) {
        res.json({ msg: err });
    }
}));
app.use(extractToken_1.default);
app.use(verifyToken_1.default);
app.post("/meals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield prisma.cheatMeal.findMany({
            where: {
                userId: req.user.id,
                date: req.body.date,
            },
        });
        res.json({ msg: meals });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}));
app.post("/mealsbydate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.body;
        let meals;
        if (startDate === undefined || endDate === undefined) {
            meals = yield prisma.cheatMeal.findMany({
                where: {
                    userId: req.user.id,
                },
            });
        }
        else {
            meals = yield prisma.cheatMeal.findMany({
                where: {
                    userId: req.user.id,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
        }
        res.json({ msg: meals });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}));
app.post("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ user: req.user });
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = {
        where: {
            username: req.user.username,
        },
    };
    const user = yield prisma.user.findFirst(User);
    if (!user) {
        res.json({ msg: "user does not exists" });
        return;
    }
    try {
        const response = yield prisma.cheatMeal.create({
            data: {
                title: req.body.title,
                isCheat: req.body.isCheat,
                userId: user.id,
                date: new Date(req.body.date),
            },
        });
        res.json({ msg: response });
    }
    catch (err) {
        res.status(401).json({ msg: err });
    }
}));
app.post("/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            username: req.user,
        },
    });
    try {
        const response = yield prisma.cheatMeal.update({
            where: {
                id: req.body.id,
            },
            data: {
                isCheat: req.body.isCheat,
            },
        });
        res.json({ msg: response });
    }
    catch (err) {
        res.json({ msg: err });
    }
}));
app.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            username: req.user,
        },
    });
    try {
        const response = yield prisma.cheatMeal.delete({
            where: {
                id: req.body.id,
            },
        });
        res.json({ msg: response });
    }
    catch (err) {
        res.json({ msg: err });
    }
}));
app.listen(3000, () => console.log("server up and running on port 3000"));
// async function insertUser(username: string, email: string, password: string) {
//   const user = await prisma.user.create({
//     data: {
//       username,
//       email,
//       password,
//     },
//   });
//   console.log(user);
// }
// async function insertCheatMeal(date: string, isCheat: boolean, userId: number) {
//   const response = await prisma.cheatMeal.create({
//     data: {
//       date: new Date(date),
//       isCheat,
//       userId,
//     },
//   });
// }
// // insertUser("sag", "spk21@gmail.com", "123456");
// insertCheatMeal("2024-06-14", true, 1);
