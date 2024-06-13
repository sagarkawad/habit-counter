import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(username: string, email: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  console.log(user);
}

async function insertCheatMeal(date: string, isCheat: boolean, userId: number) {
  const response = await prisma.cheatMeal.create({
    data: {
      date: new Date(date),
      isCheat,
      userId,
    },
  });
}

// insertUser("sag", "spk21@gmail.com", "123456");
insertCheatMeal("2024-06-13T16:30:00", true, 1);
