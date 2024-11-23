/*
  Warnings:

  - You are about to drop the column `time` on the `watering` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Watering` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTime` to the `Watering` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastTime` to the `Watering` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watering` DROP COLUMN `time`,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastTime` VARCHAR(191) NOT NULL;
