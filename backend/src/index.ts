import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "secret";

// Function to hash a password
async function hashPassword(plainPassword: string) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

app.post("/register", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = await hashPassword(req.body.password);
  const token = jwt.sign(email, JWT_SECRET);
  console.log(email, password, token);
  res.json({ token: token });
  
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
