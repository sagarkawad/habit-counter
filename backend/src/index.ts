import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/register", (req: Request, res: Response) => {
  res.json({ msg: "on register" });
});

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
