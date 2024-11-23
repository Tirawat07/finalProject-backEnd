/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `watering` table. All the data in the column will be lost.
  - Added the required column `fieldId` to the `Watering` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `watering` DROP FOREIGN KEY `Watering_scheduleId_fkey`;

-- AlterTable
ALTER TABLE `watering` DROP COLUMN `scheduleId`,
    ADD COLUMN `fieldId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Watering` ADD CONSTRAINT `Watering_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
