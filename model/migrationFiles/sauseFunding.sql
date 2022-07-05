USE ######################;
/*creating origin table to classify from what entity the data belongs*/
CREATE TABLE origin (
	id Bigint NULL,
    subsystem_origin varchar(100) NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE origin ADD CONSTRAINT origin_PK PRIMARY KEY (id);
ALTER TABLE origin MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE origin ADD CONSTRAINT origin_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE origin ADD CONSTRAINT origin_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);

INSERT INTO origin(subsystem_origin,createdBy,createdIn)VALUES('Food Truck',3,NOW());
INSERT INTO origin(subsystem_origin,createdBy,createdIn)VALUES('Online Store',3,NOW());
INSERT INTO origin(subsystem_origin,createdBy,createdIn)VALUES('Restaurant',3,NOW());
INSERT INTO origin(subsystem_origin,createdBy,createdIn)VALUES('Sause Funding',3,NOW());

/*adapating payments table and tip table to accept order_id from other entities by adding origin_id as a column in them*/
ALTER TABLE payments ADD origin_id bigint DEFAULT 1 NOT NULL;
ALTER TABLE payments CHANGE origin_id origin_id bigint DEFAULT 1 NOT NULL AFTER user_id;
ALTER TABLE payments DROP FOREIGN KEY payments_cookingDate_id;
ALTER TABLE payments DROP FOREIGN KEY payments_order_id;
ALTER TABLE payments ADD CONSTRAINT payments_FK FOREIGN KEY (origin_id) REFERENCES origin(id);
ALTER TABLE payments DROP INDEX payments_order_id;
ALTER TABLE payments DROP INDEX payments_cookingDate_id;
ALTER TABLE payments MODIFY COLUMN cookingDate_id bigint NULL;


ALTER TABLE tips ADD origin_id bigint DEFAULT 1 NOT NULL;
ALTER TABLE tips CHANGE origin_id origin_id bigint DEFAULT 1 NOT NULL FIRST;
ALTER TABLE tips DROP FOREIGN KEY tips_FK;
ALTER TABLE tips ADD CONSTRAINT tips_origin_FK FOREIGN KEY (origin_id) REFERENCES origin(id);
ALTER TABLE tips DROP INDEX tips_FK;


/*creating sause preorders table*/
CREATE TABLE sause_preorders (
	id Bigint NULL,
	`qtty` bigint NOT NULL DEFAULT '0',
	`paid` int(1) NOT NULL DEFAULT 0,
	`amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`user_id` bigint NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE sause_preorders ADD CONSTRAINT sause_preorders_PK PRIMARY KEY (id);
ALTER TABLE sause_preorders MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE sause_preorders ADD CONSTRAINT sause_preorders_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE sause_preorders ADD CONSTRAINT sause_preorders_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);

ALTER TABLE sause_preorders ADD orderNr bigint NULL;
ALTER TABLE sause_preorders CHANGE orderNr orderNr bigint NULL AFTER paid;



/*sause_price table holds sause price*/
CREATE TABLE sause_price (
	`price` decimal(10,2) NOT NULL DEFAULT '0.00'
);
INSERT INTO sause_price(price) VALUES(7.00);

ALTER TABLE sause_price ADD name varchar(100) NULL;
INSERT INTO sause_price(`name`) VALUES('Kungfu BBQ sauce bottle (pre-order)');
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*configuration table*/
CREATE TABLE configuration (
	id Bigint NULL,
	name varchar(250) NOT NULL,
	value varchar(250) NOT NULL,
	description text,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE configuration ADD CONSTRAINT configuration_PK PRIMARY KEY (id);
ALTER TABLE configuration MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE configuration ADD CONSTRAINT configuration_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE configuration ADD CONSTRAINT configuration_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
INSERT INTO configuration (name,value,createdBy,createdIn) VALUES('Sauce campaing','ON',3,NOW());
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*
										MODIFICATION DONE ON June 29 2022
*/
/*==================================================================================================================*/
/*t-shirt size table*/
CREATE TABLE sause_tShirtSize (
	`user_id` bigint NOT NULL,
	shirtSize VARCHAR(30) NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE sause_tShirtSize ADD CONSTRAINT sause_tShirtSize_PK PRIMARY KEY (user_id);
ALTER TABLE sause_tShirtSize ADD CONSTRAINT sause_tShirtSize_FK FOREIGN KEY (user_id) REFERENCES `user`(id);
ALTER TABLE sause_tShirtSize ADD CONSTRAINT sause_tShirtSize_FK_1 FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE sause_tShirtSize ADD CONSTRAINT sause_tShirtSize_FK_2 FOREIGN KEY (excludedBy) REFERENCES `user`(id);

INSERT INTO SYSTEMLOG_dbObject (object,description,createdBy,createdIn,excluded)
VALUES('sauce_tShirtSize', 'sauce_tShirtSize table',3,now(),0);

INSERT INTO configuration (name,value,description,createdBy,createdIn,excluded)
 VALUES ('Sauce Batch Value','5709','Cost of batch of sauce',3,NOW(),0);