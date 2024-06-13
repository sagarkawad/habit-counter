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
  const response = await prisma.user.create({
    data: {
      date,
      isCheat,
      userId,
    },
  });
}

// insertUser("sag", "spk21@gmail.com", "123456");
insertCheatMeal("2024-06-13 15:30:00", true, 1);
