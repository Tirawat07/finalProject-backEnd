/*
  Warnings:

  - Made the column `date` on table `date` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `date` MODIFY `date` VARCHAR(191) NOT NULL;
