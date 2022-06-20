/*change initiated on June 15 2022*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*foodtruck_cd_presenceConfirmation*/
CREATE TABLE cookingDate_presenceConfirmation (
	cookingDate_id Bigint NOT NULL,
	user_id bigint NOT NULL,
	createdBy bigint NOT NULL,
	createdIn timestamp DEFAULT Current_timestamp NOT NULL,
	excluded int(1) DEFAULT 0 NOT NULL,
	excludedBy bigint NULL,
	excludedIn timestamp NULL
);
ALTER TABLE cookingDate_presenceConfirmation ADD CONSTRAINT cookingDate_presenceConfirmation_PK PRIMARY KEY (cookingDate_id,user_id);
ALTER TABLE cookingDate_presenceConfirmation ADD CONSTRAINT cookingDate_presenceConfirmation_FK FOREIGN KEY (user_id) REFERENCES `user`(id);
ALTER TABLE cookingDate_presenceConfirmation ADD CONSTRAINT cookingDate_presenceConfirmation_FK_1 FOREIGN KEY (createdBy) REFERENCES `user`(id);
ALTER TABLE cookingDate_presenceConfirmation ADD CONSTRAINT cookingDate_presenceConfirmation_FK_2 FOREIGN KEY (excludedBy) REFERENCES `user`(id);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*creating new cooking date status*/
INSERT INTO cookingDate_status (id,name,description,nextStatus,createdBy,createdIn,excluded)
VALUES (20,'Event only','Cooking date events that will sell only First Come First Served',9,3,NOW(),0);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*updating cooking date table columns*/
ALTER TABLE cookingDates ADD eventOnly int(1) DEFAULT 0 NOT NULL;
ALTER TABLE cookingDates ADD maybeGo bigint DEFAULT 0 NOT NULL;
ALTER TABLE cookingDates CHANGE eventOnly eventOnly int(1) DEFAULT 0 NOT NULL AFTER maybeGo;
ALTER TABLE cookingDates CHANGE maybeGo maybeGo bigint DEFAULT 0 NOT NULL AFTER mealsConfirmed;
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*creating new systemLOG_dbObject*/
INSERT INTO SYSTEMLOG_dbObject (object,description,createdBy,createdIn,excluded)
VALUES ('cookingDates, cookingDate_presenceConfirmation', 'Tables: cookingDates and cookingDate_presenceConfirmation',3,CURRENT_TIMESTAMP(),0);
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/*updating notification_user table*/
SET FOREIGN_KEY_CHECKS = 0; 
ALTER TABLE notification_user DROP FOREIGN KEY notification_user_FK_1;
ALTER TABLE notification_user DROP FOREIGN KEY notification_user_FK;
ALTER TABLE notification_user DROP PRIMARY KEY;
SET FOREIGN_KEY_CHECKS = 1; 

ALTER TABLE notification_user ADD CONSTRAINT notification_user_PK PRIMARY KEY (user_fk,notification_fk,sentOn);
ALTER TABLE notification_user ADD CONSTRAINT notification_user_FK FOREIGN KEY (user_fk) REFERENCES `user`(id);
ALTER TABLE notification_user ADD CONSTRAINT notification_user_FK_1 FOREIGN KEY (notification_fk) REFERENCES notification(id);

