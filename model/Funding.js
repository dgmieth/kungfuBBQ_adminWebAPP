//database modules
const db = require('./bd/pool')
//env variables
const finishedStatus = parseInt(process.env.DB_COOKING_DATE_FINISHED_ORDER_STATUS)
var dbName = process.env.DB_NAME
module.exports = class Order {
    //=======================================================================================================
    //INSTANCE  =============================================================================================
    //=======================================================================================================
    constructor(){

    }
    //=======================================================================================================
    //CLASS  ================================================================================================
    //=======================================================================================================
    static getSausePrice(){
        return db.query(`SELECT funding_sause_getPrice();`)
    }
    static getInformation(){
        return db.query(`CALL funding_sause_getInformation();`)
    }
    static getPreOrders(){
        return db.query(`CALL funding_sause_getPreOrders();`)
    }
    static getAllUserIdsForNotification(allPreOrders){
        return db.query(`CALL notification_getUserIdsForManualNotifications(0,?,@returnCode);`,[`${allPreOrders}`])
    }
    static getCampaignStatus(){
        return db.query(`CALL funding_sause_campaignStatus(FALSE,0);`)
    }
    static updateCampaignStatus(userId) {
        return db.query(`CALL funding_sause_campaignStatus(TRUE,?);`,[`${userId}`])
    }
    static listFounders(){
        return db.query(`CALL funding_sause_listFounders();`)
    }
}