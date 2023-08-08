-- CreateTable
CREATE TABLE `MyMemoItem` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `isChecked` BOOLEAN NOT NULL,
    `sortOrder` INTEGER UNSIGNED NOT NULL,

    INDEX `MyMemoItem_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopListRecipe` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `ShopListRecipe_userId_idx`(`userId`),
    INDEX `ShopListRecipe_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopListIngredient` (
    `id` VARCHAR(191) NOT NULL,
    `shopListRecipeId` VARCHAR(191) NOT NULL,
    `recipeIngredientId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `isChecked` BOOLEAN NOT NULL,
    `sortOrder` INTEGER UNSIGNED NOT NULL,

    INDEX `ShopListIngredient_shopListRecipeId_idx`(`shopListRecipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
