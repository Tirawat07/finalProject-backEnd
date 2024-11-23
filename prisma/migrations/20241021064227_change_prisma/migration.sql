-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_dateId_fkey`;

-- DropForeignKey
ALTER TABLE `watering` DROP FOREIGN KEY `Watering_fieldId_fkey`;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `Date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watering` ADD CONSTRAINT `Watering_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
