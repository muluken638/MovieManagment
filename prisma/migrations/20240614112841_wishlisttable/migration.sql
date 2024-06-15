-- CreateTable
CREATE TABLE `wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_id_fkey` FOREIGN KEY (`id`) REFERENCES `Movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
