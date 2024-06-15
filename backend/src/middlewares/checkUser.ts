import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

async function checkUser(req: Request, res: Response, next: NextFunction) {
  const response = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: req.body.username,
        },
        {
          email: req.body.email,
        },
      ],
    },
  });
  if (response) {
    res.status(500).json({ msg: "user already exists" });
  } else {
    next();
  }
}

export default checkUser;
