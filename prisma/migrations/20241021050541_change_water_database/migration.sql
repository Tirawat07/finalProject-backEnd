/*
  Warnings:

  - You are about to drop the column `userId` on the `field` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `watering` table. All the data in the column will be lost.
  - The values [FINISHED] on the enum `Watering_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `dateId` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Watering` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_userId_fkey`;

-- AlterTable
ALTER TABLE `field` DROP COLUMN `userId`,
    ADD COLUMN `dateId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `watering` DROP COLUMN `date`,
    ADD COLUMN `time` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('Complete', 'CANCLE') NOT NULL;

-- CreateTable
CREATE TABLE `Date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Date` ADD CONSTRAINT `Date_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `Date`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
