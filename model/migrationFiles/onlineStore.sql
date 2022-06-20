USE ######################;
/*online store items table*/
CREATE TABLE s_items (
	id Bigint NULL,
    s_category_id bigint NOT NULL,
	name varchar(100) NOT NULL,
	price decimal(10,2) DEFAULT 0.00 NOT NULL,
	description text NULL,
    hide int(1) DEFAULT 0 NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_items ADD CONSTRAINT s_items_PK PRIMARY KEY (id);
ALTER TABLE s_items MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_items ADD CONSTRAINT s_items_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_items ADD CONSTRAINT s_items_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store items categories table*/
CREATE TABLE s_categories (
	id Bigint NULL,
	name varchar(100) NOT NULL,
	description text NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_categories ADD CONSTRAINT s_categories_PK PRIMARY KEY (id);
ALTER TABLE s_categories MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_categories ADD CONSTRAINT s_categories_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_categories ADD CONSTRAINT s_categories_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
ALTER TABLE s_items ADD CONSTRAINT s_items_FK_2 FOREIGN KEY (s_category_id) REFERENCES s_categories(id);


INSERT INTO s_categories (name,createdBy,createdIn) VALUES ('Clothing',3,NOW());
INSERT INTO s_categories (name,createdBy,createdIn) VALUES ('Souvenir',3,NOW());
INSERT INTO s_categories (name,createdBy,createdIn) VALUES ('Silverware',3,NOW());
INSERT INTO s_categories (name,createdBy,createdIn) VALUES ('Sauses',3,NOW());
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store groups of specifications of the item*/
CREATE TABLE s_specification_groups (
	id Bigint NULL,
	s_item_id bigint NOT NULL,
	name varchar(100) NOT NULL,
	hide int(1) DEFAULT 0 NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_specification_groups ADD CONSTRAINT s_specification_groups_PK PRIMARY KEY (id);
ALTER TABLE s_specification_groups MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_specification_groups ADD CONSTRAINT s_specification_groups_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_specification_groups ADD CONSTRAINT s_specification_groups_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
ALTER TABLE s_specification_groups ADD CONSTRAINT s_specification_groups_FK_2 FOREIGN KEY (s_item_id) REFERENCES s_items(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store specification values for a group of specifications of the item*/
CREATE TABLE s_specification_values (
	id Bigint NULL,
	s_specification_group_id bigint NOT NULL,
	value varchar(100) NOT NULL,
	hide int(1) DEFAULT 0 NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_specification_values ADD CONSTRAINT s_specification_values_PK PRIMARY KEY (id);
ALTER TABLE s_specification_values MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_specification_values ADD CONSTRAINT s_specification_values_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_specification_values ADD CONSTRAINT s_specification_values_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
ALTER TABLE s_specification_values ADD CONSTRAINT s_specification_values_FK_2 FOREIGN KEY (s_specification_group_id) REFERENCES s_specification_groups(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store item images*/
CREATE TABLE s_item_images (
	id Bigint NULL,
	s_item_id bigint NOT NULL,
	url text NOT NULL,
	hide int(1) DEFAULT 0 NOT NULL,
	main int(1) DEFAULT 0 NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_item_images ADD CONSTRAINT s_item_images_PK PRIMARY KEY (id);
ALTER TABLE s_item_images MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_item_images ADD CONSTRAINT s_item_images_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_item_images ADD CONSTRAINT s_item_images_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
ALTER TABLE s_item_images ADD CONSTRAINT s_item_images_FK_2 FOREIGN KEY (s_item_id) REFERENCES s_items(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store orders*/
CREATE TABLE s_orders (
	id Bigint NULL,
	s_order_status_id bigint NOT NULL,
	observation text NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_orders ADD CONSTRAINT s_orders_PK PRIMARY KEY (id);
ALTER TABLE s_orders MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_orders ADD CONSTRAINT s_orders_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_orders ADD CONSTRAINT s_orders_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store order status*/
CREATE TABLE s_order_status (
	id Bigint NULL,
	name varchar(100) NOT NULL,
	description text NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_order_status ADD CONSTRAINT s_order_status_PK PRIMARY KEY (id);
ALTER TABLE s_order_status MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_order_status ADD CONSTRAINT s_order_status_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_order_status ADD CONSTRAINT s_order_status_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);

ALTER TABLE s_orders ADD CONSTRAINT s_orders_FK_2 FOREIGN KEY (s_order_status_id) REFERENCES s_order_status(id);


INSERT INTO s_order_status (name,createdBy,createdIn) VALUES('New',3,NOW());
INSERT INTO s_order_status (name,createdBy,createdIn) VALUES('Waiting checkout',3,NOW());
INSERT INTO s_order_status (name,createdBy,createdIn) VALUES('Paid',3,NOW());
INSERT INTO s_order_status (name,createdBy,createdIn) VALUES('Waiting delivery',3,NOW());
INSERT INTO s_order_status (name,createdBy,createdIn) VALUES('Delivered',3,NOW());
INSERT INTO s_order_status (id,name,createdBy,createdIn) VALUES(990,'Excluded by user',3,NOW());
INSERT INTO s_order_status (id,name,createdBy,createdIn) VALUES(991,'Excluded by KungfuBBQ',3,NOW());
INSERT INTO s_order_status (id,name,createdBy,createdIn) VALUES(9999,'Reimbursed',3,NOW());
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store items in the order*/
CREATE TABLE s_order_items (
	id Bigint NULL,
	s_order_id bigint NOT NULL,
	s_item_id bigint NOT NULL,
	observation text NULL,
	qtty INT(5) DEFAULT 1 NOT NULL,
	price decimal(10,2) DEFAULT 0.00 NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE s_order_items ADD CONSTRAINT s_order_items_PK PRIMARY KEY (id);
ALTER TABLE s_order_items MODIFY COLUMN id bigint auto_increment NOT NULL;
ALTER TABLE s_order_items ADD CONSTRAINT s_order_items_FK FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE s_order_items ADD CONSTRAINT s_order_items_FK_1 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
ALTER TABLE s_order_items ADD CONSTRAINT s_order_items_FK_2 FOREIGN KEY (s_order_id) REFERENCES s_orders(id);
ALTER TABLE s_order_items ADD CONSTRAINT s_order_items_FK_3 FOREIGN KEY (s_item_id) REFERENCES s_items(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*online store modify columns from all table to avoid timestamp update upon any update*/
ALTER TABLE s_order_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_order_status MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_orders MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_item_images MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_specification_values MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_specification_groups MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_categories MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;


ALTER TABLE s_order_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_order_status MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_orders MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_item_images MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_specification_values MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_specification_groups MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_categories MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE s_items MODIFY COLUMN createdIn timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;



