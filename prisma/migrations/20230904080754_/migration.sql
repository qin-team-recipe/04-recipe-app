/*
  Warnings:

  - A unique constraint covering the columns `[userId,recipeId]` on the table `ShopListRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ShopListRecipe_userId_idx` ON `ShopListRecipe`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `biography` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserUrl` (
    `id` VARCHAR(30) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    INDEX `UserUrl_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ShopListRecipe_userId_recipeId_key` ON `ShopListRecipe`(`userId`, `recipeId`);
