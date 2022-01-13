//database modules
const db = require('./bd/pool')
//support funcionts
var dbName = process.env.DB_NAME
const checkAccesses = require('../app/controller/supportFunctions/checkAccesses')
module.exports = class User {
    constructor(id) {
        this.id = parseInt(id)
        this.email = null
        this.name = null
        this.phoneNumber = null
        this.socialMediaFacebook = null
        this.socialMediaInstagram = null
    }
    set setEmail(email){
        this.email = email
    }
    set setName(name){
        this.name = name
    }
    set setPhoneNumber(phoneNumber){
        this.phoneNumber = phoneNumber
    }
    set setSocialMediaFacebook(socialMediaFacebook){
        this.socialMediaFacebook = socialMediaFacebook
    }
    set setSocialMediaInstagram(socialMediaInstagram){
        this.socialMediaInstagram = socialMediaInstagram
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    fetchById(){
        return db.query(`SELECT 
                            u.*,
                            u2.name as createdByName,
                            u3.name as excludedByName,
                            usm.socialMedia_id,
                            sm.socialMedia,
                            usm.socialMediaName
                        FROM ${dbName}.\`user\` u
                        LEFT JOIN ${dbName}.user_socialMedia usm ON usm.user_id = u.id 
                        LEFT JOIN ${dbName}.socialMedia sm ON sm.id = usm.socialMedia_id 
                        LEFT JOIN ${dbName}.\`user\` u2 on u2.id = u.createdBy 
                        LEFT JOIN ${dbName}.\`user\` u3 on u3.id = u.excludedBy 
                        WHERE usm.excluded = 0 and sm.excluded = 0 AND u.id = ?
                        ORDER BY u.id ;`, [`${this.id}`])
    }
    updateInformation(){
        const name = this.name === '' ? `''` : `'${this.name}'`
        const phoneNumber = this.phoneNumber === '' ? `''` : `'${this.phoneNumber}'`
        const socialMediaFacebook = this.socialMediaFacebook === '' ? `''` : `'${this.socialMediaFacebook}'`
        const socialMediaInstagram = this.socialMediaInstagram === '' ? `''` : `'${this.socialMediaInstagram}'`
        return db.query(`UPDATE ${dbName}.\`user\` 
                        SET 
                            name = ${name},
                            phoneNumber = ${phoneNumber}
                        WHERE id = ?;
                        UPDATE ${dbName}.user_socialMedia t
                        SET
                            t.socialMediaName = ${socialMediaFacebook}
                        WHERE t.socialMedia_id = (SELECT s.id FROM ${dbName}.socialMedia s WHERE s.excluded = 0 AND s.socialMedia = ?) AND t.user_id = ?;
                        UPDATE ${dbName}.user_socialMedia t
                        SET
                            t.socialMediaName = ${socialMediaInstagram}
                        WHERE t.socialMedia_id = (SELECT s.id FROM ${dbName}.socialMedia s WHERE s.excluded = 0 AND s.socialMedia = ?) AND t.user_id = ?;
                        `, [`${this.id}`,
                        `${process.env.FACEBOOK}`,`${this.id}`,
                        `${process.env.INSTAGRAM}`,`${this.id}`])
    }
    // CRUD =================================================================
     // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    static fetchById(userId){
        return db.query(`SELECT DISTINCT 
                            t.* 
                        FROM ${dbName}.\`user\` t
                        LEFT JOIN user_user_type t1 ON t1.user_id = t.id 
                        WHERE t1.user_type_id IN (1,2) AND id = ?;`, [`${userId}`])
    }
    static fetchActiveCodeByEmail(email){
        return db.query(`SELECT 
                            ic.code
                        FROM ${dbName}.invitationCode ic 
                        WHERE ic.used = 0 AND ic.excluded = 0 AND ic.email = ?`, [`${email}`])
    }
    static fectchUserByEmail_invitationCode(email){
        return db.query(`SELECT DISTINCT 
                            t.*
                        FROM ${dbName}.\`user\` t
                        WHERE t.excluded = 0 AND t.email = ?;`, [`${email}`])
    }
    static fetchAllUsers(sessionReqObject){
        var hasFullAcces = checkAccesses.checkUserAccess(process.env.ADM_FULL_ACCESS,sessionReqObject)
        return db.query(`CALL ${dbName}.adm_FetchAllUsers(?);`, [`${hasFullAcces ? 1 : 3}`])
    }
    static updateUserAccesses(jsonObj,createdUpdateBy){
        return db.query(`CALL ${dbName}.updateAccesses(?,?)`,[`${jsonObj}`,`${createdUpdateBy}`])
    }
}