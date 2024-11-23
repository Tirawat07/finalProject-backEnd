/*
  Warnings:

  - You are about to alter the column `duration` on the `watering` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `watering` MODIFY `duration` INTEGER NOT NULL;
