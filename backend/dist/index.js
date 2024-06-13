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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });
        console.log(user);
    });
}
function insertCheatMeal(date, isCheat, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.cheatMeal.create({
            data: {
                date: new Date(date),
                isCheat,
                userId,
            },
        });
    });
}
// insertUser("sag", "spk21@gmail.com", "123456");
insertCheatMeal("2024-06-13T16:30:00", true, 1);
