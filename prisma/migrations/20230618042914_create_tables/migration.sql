-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(30) NOT NULL,
    `clerkId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(32) NOT NULL,

    UNIQUE INDEX `User_clerkId_key`(`clerkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chef` (
    `id` VARCHAR(30) NOT NULL,
    `displayName` VARCHAR(32) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChefLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chefId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `siteName` VARCHAR(191) NOT NULL,
    `followerCount` INTEGER UNSIGNED NULL,

    INDEX `ChefLink_chefId_idx`(`chefId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `yields` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChefRecipe` (
    `recipeId` VARCHAR(30) NOT NULL,
    `chefId` VARCHAR(191) NOT NULL,

    INDEX `ChefRecipe_recipeId_idx`(`recipeId`),
    INDEX `ChefRecipe_chefId_idx`(`chefId`),
    PRIMARY KEY (`recipeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyRecipe` (
    `recipeId` VARCHAR(30) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `MyRecipe_recipeId_idx`(`recipeId`),
    INDEX `MyRecipe_userId_idx`(`userId`),
    PRIMARY KEY (`recipeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `RecipeImage_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeProcess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    INDEX `RecipeIngredient_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    INDEX `RecipeLink_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Following` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `chefId` VARCHAR(191) NOT NULL,

    INDEX `Following_chefId_idx`(`chefId`),
    UNIQUE INDEX `Following_userId_chefId_key`(`userId`, `chefId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `Favorite_recipeId_idx`(`recipeId`),
    UNIQUE INDEX `Favorite_userId_recipeId_key`(`userId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
