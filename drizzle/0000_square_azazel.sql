CREATE TABLE `accounts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`twitter_id` varchar(100),
	`twitter_name` varchar(255),
	`address` varchar(42),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_twitter_id_unique` UNIQUE(`twitter_id`)
);
--> statement-breakpoint
CREATE INDEX `twitter_id_idx` ON `accounts` (`twitter_id`);