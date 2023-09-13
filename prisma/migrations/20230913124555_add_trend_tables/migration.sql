/*
  Warnings:

  - A unique constraint covering the columns `[userId,recipeId]` on the table `ShopListRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ShopListRecipe_userId_idx` ON `ShopListRecipe`;

-- AlterTable
ALTER TABLE `Favorite` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Following` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `ChefTrend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chefId` VARCHAR(191) NOT NULL,
    `newFollowers` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ChefTrend_chefId_idx`(`chefId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeTrend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` VARCHAR(191) NOT NULL,
    `newFavorites` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RecipeTrend_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ShopListRecipe_userId_recipeId_key` ON `ShopListRecipe`(`userId`, `recipeId`);
