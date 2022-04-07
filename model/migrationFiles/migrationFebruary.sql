/*FIRST DATABASE CHANGE -> MARCH 2022*/
CREATE TABLE `tips` (
  `order_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `paidIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reimbursed` int NOT NULL DEFAULT '0'
)
ALTER TABLE {XXXXXXXXXXXXXXXX}.tips ADD CONSTRAINT tips_FK FOREIGN KEY (order_id) REFERENCES kungfuBBQ_test.`order`(id);
ALTER TABLE {XXXXXXXXXXXXXXXX}.tips ADD CONSTRAINT tips_FK_1 FOREIGN KEY (user_id) REFERENCES kungfuBBQ_test.`user`(id);
/*new databse object*/
INSERT INTO {XXXXXXXXXXXXXXXX}.SYSTEMLOG_dbObject (`object`,description,createdBy)
	VALUES ('tips','Databse table tips',3);

/*SECOND DATABASE CHANGE -> APRIL 2022*/
ALTER TABLE {XXXXXXXXXXXXXXXX}.APPLICATION_address ADD venue varchar(100) NULL;
ALTER TABLE {XXXXXXXXXXXXXXXX}.APPLICATION_address CHANGE venue venue varchar(100) NULL AFTER id;

ALTER TABLE {XXXXXXXXXXXXXXXX}.cookingDates ADD endTime TIMESTAMP NULL;
ALTER TABLE {XXXXXXXXXXXXXXXX}.cookingDates CHANGE endTime endTime TIMESTAMP NULL AFTER cookingDate;

