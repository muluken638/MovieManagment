/*
  Warnings:

  - Added the required column `director` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `director` VARCHAR(255) NOT NULL,
    ADD COLUMN `genre` VARCHAR(255) NOT NULL;
