/*
  Warnings:

  - Added the required column `date` to the `Watering` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watering` ADD COLUMN `date` INTEGER NOT NULL;
