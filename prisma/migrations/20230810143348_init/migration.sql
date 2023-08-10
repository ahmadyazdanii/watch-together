-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email_address` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_address_key`(`email_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hall` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `movie_url` VARCHAR(512) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOfHalls` (
    `member_id` VARCHAR(191) NOT NULL,
    `hall_id` INTEGER UNSIGNED NOT NULL,
    `role` ENUM('PROVIDER', 'CLIENT') NOT NULL DEFAULT 'CLIENT',

    PRIMARY KEY (`member_id`, `hall_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOfHalls` ADD CONSTRAINT `UsersOfHalls_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOfHalls` ADD CONSTRAINT `UsersOfHalls_hall_id_fkey` FOREIGN KEY (`hall_id`) REFERENCES `Hall`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
