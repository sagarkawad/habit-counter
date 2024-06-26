import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import extractToken from "./middlewares/extractToken";
import verifyToken from "./middlewares/verifyToken";
import checkUser from "./middlewares/checkUser";

const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "secret";

// Function to check if Prisma Client is initialized correctly
const checkPrismaConnection = async () => {
  try {
    // Perform a simple query to check the connection
    await prisma.$connect();
    console.log("Prisma Client initialized successfully.");
  } catch (error) {
    console.error("Error initializing Prisma Client:", error);
  }
};

// Call the function to check the connection
checkPrismaConnection();

// Function to hash a password
async function hashPassword(plainPassword: string): Promise<string> {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

// Example function to check passwords
async function checkPassword(
  inputPassword: string,
  storedHashedPassword: string | undefined
): Promise<boolean | void> {
  if (!storedHashedPassword) {
    console.error("Stored hashed password is undefined.");
    return false;
  }

  try {
    const match = await bcrypt.compare(inputPassword, storedHashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

app.post("/register", checkUser, async (req: Request, res: Response) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = await hashPassword(req.body.password);

  //   console.log(email, password, token);
  try {
    const response = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(201).json({ msg: "user successfully created" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const response = await prisma.user.findFirst({
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

    const passResponse = await checkPassword(password, response?.password);
    if (passResponse) {
      const token = jwt.sign(username, JWT_SECRET);
      res.json({ token });
    } else {
      res.json({ msg: "incorrect password" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

app.use(extractToken);
app.use(verifyToken);

app.post("/add", async (req: Request, res: Response) => {
  //   if (!req.token) {
  //     res.json({ msg: "no token found!" });
  //   }

  const user = await prisma.user.findFirst({
    where: {
      username: req.user,
    },
  });

  if (!user) {
    res.json({ msg: "user does not exists" });
    return;
  }

  try {
    const response = await prisma.cheatMeal.create({
      data: {
        title: req.body.title,
        isCheat: req.body.isCheat,
        userId: user.id,
        date: new Date(req.body.date),
      },
    });
    res.json({ msg: response });
  } catch (err) {
    res.json({ msg: err });
  }
});

app.post("/edit", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.user,
    },
  });

  try {
    const response = await prisma.cheatMeal.update({
      where: {
        id: req.body.id,
      },
      data: {
        isCheat: req.body.isCheat,
      },
    });
    res.json({ msg: response });
  } catch (err) {
    res.json({ msg: err });
  }
});

app.post("/delete", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.user,
    },
  });

  try {
    const response = await prisma.cheatMeal.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: response });
  } catch (err) {
    res.json({ msg: err });
  }
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
