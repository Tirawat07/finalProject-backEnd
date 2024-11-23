/*
  Warnings:

  - You are about to drop the column `name` on the `field` table. All the data in the column will be lost.
  - Added the required column `fieldName` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `field` DROP COLUMN `name`,
    ADD COLUMN `fieldName` VARCHAR(191) NOT NULL;
