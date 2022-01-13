//database modules
const db = require('./bd/pool')
var dbName = process.env.DB_NAME
module.exports = class Developer {
    constructor(email,id,password) {
        this.email = email
        this.id = id
        this.password = password
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    save(savingType){
         switch (savingType) {
            case 'password':
                return db.query(`UPDATE ${dbName}.\`user\` t SET t.password = ? WHERE id = ?`, [`${this.password}`, `${this.id}`])
                break;
            default:
                break;
        }
    }
    // LOGS =================================================================
    pageLogin(){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id, SYSTEMLOG_dbObject_id, 
                                        dbObject_affectedRegisterID, executedBy , systemTimestamp )
                            VALUES (10,1,NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    static fetchByEmail(email){
        return db.query(`SELECT DISTINCT 
                            t.* 
                        FROM ${dbName}.user t
                        LEFT JOIN ${dbName}.user_user_type t1 ON t1.user_id = t.id 
                        WHERE t1.user_type_id IN (1,2) AND email = ?`, [`${email}`])
    }
    static openDevelopingHours() {
        return db.query(`SELECT count(id) as contador FROM ${dbName}.SYSTEMLOG_developingHours WHERE ended = 0;`)
    }
    static returnAllDevelopmentRegisters(){
        return db.query(`SELECT * FROM ${dbName}.SYSTEMLOG_developingHours;`)
    }
    static inserStartDeveloping(){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG_developingHours (startedAt,ended) VALUES (current_timestamp, 0)`)
    }
    static updateOpenDeveloping(text){
        return db.query(`UPDATE ${dbName}.SYSTEMLOG_developingHours SET ended = 1, endedAt = current_timestamp, developmentDetails = ? WHERE ended = 0`, [`${text}`])
    }
    static getMinutesWorked(){
        return db.query(`SELECT SUM(TIMESTAMPDIFF(SECOND , s.startedAt , s.endedAt)) as minutes FROM ${dbName}.SYSTEMLOG_developingHours s;`)
    }
}