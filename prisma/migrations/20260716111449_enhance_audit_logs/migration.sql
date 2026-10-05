-- AlterTable
ALTER TABLE `auditlog` ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `requestMethod` VARCHAR(191) NULL,
    ADD COLUMN `requestPath` VARCHAR(191) NULL,
    ADD COLUMN `statusCode` INTEGER NULL;
