/*
  Warnings:

  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_userId_fkey`;

-- DropForeignKey
ALTER TABLE `watering` DROP FOREIGN KEY `Watering_scheduleId_fkey`;

-- DropTable
DROP TABLE `schedule`;

-- CreateTable
CREATE TABLE `Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Field_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watering` ADD CONSTRAINT `Watering_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
