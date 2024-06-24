-- CreateTable
CREATE TABLE `ButtonStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `director` VARCHAR(191) NULL,
    `releaseYear` INTEGER NULL,
    `runtime` INTEGER NULL,
    `genre` ENUM('Romance', 'Action', 'Horror', 'Comedy', 'Drama', 'SciFi', 'Documentary', 'Animation', 'Adventure', 'Thriller', 'Fantasy', 'Crime', 'War', 'History', 'Music', 'Mystery', 'Family', 'Biography', 'Sport', 'Western') NULL,
    `image` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `plotSummary` VARCHAR(191) NULL,
    `cast` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewData` (
    `movieId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `director` VARCHAR(191) NULL,
    `genre` ENUM('Romance', 'Action', 'Horror', 'Comedy', 'Drama', 'SciFi', 'Documentary', 'Animation', 'Adventure', 'Thriller', 'Fantasy', 'Crime', 'War', 'History', 'Music', 'Mystery', 'Family', 'Biography', 'Sport', 'Western') NULL,

    PRIMARY KEY (`movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRegistration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `UserRegistration_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `director` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userwishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `director` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_id_fkey` FOREIGN KEY (`id`) REFERENCES `Movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
