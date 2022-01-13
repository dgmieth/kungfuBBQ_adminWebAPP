//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class CatoringMessage {
    constructor(id){
        this.id = id
        this.userId = null
    }
    set setUserId(userId){
        this.userId = userId
    }
     // =====================================================================
    // INSTANCE METHODS======================================================
    // ======================================================================
    // CRUD =================================================================
    markMessageAsRead(){
        return db.query(`CALL ${dbName}.readCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
    deleteMessage(){
        return db.query(`CALL ${dbName}.deleteCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
    archiveMessage(){
        return db.query(`CALL ${dbName}.archiveCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchAllMessages(){
        return db.query(`SELECT
                            co.id,
                            co.name,
                            co.email ,
                            co.orderDescription,
                            co.phoneNumber,
                            co.createdIn ,
                            co.\`read\`,
                            u3.name as readBy ,
                            co.readIn,
                            co.excluded,
                            co.excludedIn,
                            u2.name as excludedBy ,
                            co.archived,
                            co.archivedIn,
                            u.name as archivedBy 
                        FROM ${dbName}.CATORING_orders co 
                        LEFT JOIN ${dbName}.\`user\` u ON u.id = co.archivedBy 
                        LEFT JOIN ${dbName}.\`user\` u2 ON u2.id = co.excludedBy
                        LEFT JOIN ${dbName}.\`user\` u3 ON u3.id = co.readBy  `)
    }
}