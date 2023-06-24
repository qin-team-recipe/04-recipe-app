/*
  Warnings:

  - Added the required column `recipeId` to the `RecipeProcess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RecipeProcess` ADD COLUMN `recipeId` VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE INDEX `RecipeProcess_recipeId_idx` ON `RecipeProcess`(`recipeId`);
