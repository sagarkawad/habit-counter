/*
  Warnings:

  - You are about to drop the column `done` on the `cheatmeal` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `cheatmeal` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `CheatMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCheat` to the `CheatMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cheatmeal` DROP COLUMN `done`,
    DROP COLUMN `title`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `isCheat` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `FirstName`,
    DROP COLUMN `LastName`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `CheatMeal` ADD CONSTRAINT `CheatMeal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
