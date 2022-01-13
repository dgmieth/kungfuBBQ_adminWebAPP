//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class Administrator {
    constructor(email,id,password) {
        this.email = email
        this.id = id
        this.password = password
        this.accesses = []
        this.apiAccessToken = null
    }
    set setAccesses(accesses){
        this.accesses = accesses
    }
    set setApiAccessToken(token){
        console.log(token)
        this.apiAccessToken = token
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    save(savingType, callback){
        switch (savingType) {
            case 'password':
                db.query(`UPDATE ${dbName}.\`user\` t SET t.password = ? WHERE id = ?`, [`${this.password}`, `${this.id}`])
                .then(([data,meta])=> {
                    callback(null,{success:'Password updated'})
                })
                .catch(err => {
                    console.log 
                    callback({error:err},null)
                })
                break;
        
            default:
                break;
        }
    }
    selectAccess(){
        return db.query(`SELECT 
                            ut.name 
                        FROM ${dbName}.user_user_type uut 
                        LEFT JOIN ${dbName}.\`user\` u ON u.id = uut.user_id 
                        LEFT JOIN ${dbName}.user_type ut ON ut.id = uut.user_type_id  
                        WHERE uut.excluded = 0 AND ut.excluded = 0 AND u.excluded  = 0 AND u.id = ?`, [`${this.id}`])
    }
    deleteUserById(userId){
        return db.query(`CALL ${dbName}.adm_DeleteUser(?, ?, @returnCode);SELECT @returnCode as returnCode;`,[`${userId}`,`${this.id}`])
    }
    saveNewInvitationCode(email,code){
        return db.query(`INSERT INTO ${dbName}.invitationCode (code,email,used,     
                                            createdBy,createdIn,excluded)
                        VALUES (?,?,0,?,CURRENT_TIMESTAMP(),0);`, 
                        [`${code}`,`${email}`,`${this.id}`])
    }
    // LOGS =================================================================
    pageLogin(){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id, SYSTEMLOG_dbObject_id, 
                                        dbObject_affectedRegisterID, executedBy , systemTimestamp )
                            VALUES (10,1,NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    logUpdateUserInfo(userID){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    SYSTEMLOG_dbObject_id, 
                                        dbObject_affectedRegisterID, executedBy , systemTimestamp )
                            VALUES (3,1,?,?,CURRENT_TIMESTAMP());
                            INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    SYSTEMLOG_dbObject_id, 
                                dbObject_affectedRegisterID, executedBy , systemTimestamp )
                    VALUES (3,2,?,?,CURRENT_TIMESTAMP());
                            `, [`${userID}`,`${this.id}`,`${userID}`,`${this.id}`])
    }
    logDeleteUserById(userID){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    
                        SYSTEMLOG_dbObject_id, dbObject_affectedRegisterID, executedBy , systemTimestamp ) VALUES (11,1,?,?,CURRENT_TIMESTAMP());
                        INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    
                        SYSTEMLOG_dbObject_id, dbObject_affectedRegisterID, executedBy , systemTimestamp ) VALUES (11,2,?,?,CURRENT_TIMESTAMP());
                        INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    
                        SYSTEMLOG_dbObject_id, dbObject_affectedRegisterID, executedBy , systemTimestamp ) VALUES (11,3,?,?,CURRENT_TIMESTAMP());`,
                        [`${userID}`,`${this.id}`,
                        `${userID}`,`${this.id}`,
                        `${userID}`,`${this.id}`])
    }
    logNewInvitationCode(){
        return db.query(`INSERT INTO ${dbName}.SYSTEMLOG (SYSTEMLOG_dbAction_id,    
                        SYSTEMLOG_dbObject_id, dbObject_affectedRegisterID, executedBy , systemTimestamp ) VALUES (12,4,NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    static fetchByEmail(email){
        return db.query(`SELECT DISTINCT 
                            t.* 
                        FROM ${dbName}.user t
                        LEFT JOIN ${dbName}.user_user_type t1 ON t1.user_id = t.id 
                        WHERE t1.user_type_id IN (1,2,3) AND email = ?;
                        `, [`${email}`])
    }
    
}

