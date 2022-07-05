//npm modules

//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require('../../../model/Developer')
const User = require('../../../model/User')
const Order = require('../../../model/Order')
const Notification = require('../../../model/Notification')
const Funding = require('../../../model/Funding')
//supportFunctions
const datetimeFormatter = require('../supportFunctions/datetimeFormatter')
const invitationCodeGenerator = require('../supportFunctions/invitationCodeGenerator')
const sorter = require('../supportFunctions/sorter')
const sendNotification = require(`../supportFunctions/sendNotification`)
//return object
//return object
const returnObject = {
    hasErrors: false,
    data: null,
    msg: null}
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)}
// ======================================================================
// CTRL FUNCTIONS =======================================================
//=====================================================================
//GET PREORDERS REQUEST ===============================================
exports.getInformationAndPreOrders = (req,res,next) => {
    console.log('sauseFundingCtrl - getInformationAndPreOrders -> ')
    Funding.getPreOrders()
    .then(([answer,meta])=>{
        if(answer.length > 0){
            var preOrders = answer[0]
            Funding.getSausePrice()
            .then(([answer2,meta2])=>{
                if(answer2.length>0){
                    var price = answer2[0]['funding_sause_getPrice()']
                    Funding.getInformation()
                    .then(([answer3,meta3])=>{
                        if(answer3.length>0){
                            var amountRaised = answer3[0][0].totalAmount
                            var preOrdersAmount = answer3[1][0].totalAmount
                            var tipsAmount = answer3[2][0].totalAmount
                            Funding.getCampaignStatus()
                            .then(([answer4,meta4])=>{
                                var status = answer4[0][0].status
                                returnObject.hasErrors = false
                                returnObject.data = {   preOrders,  price,  amountRaised, preOrdersAmount, tipsAmount, status    }
                                return res.json(returnObject)   
                            })
                            .catch(err => {
                                console.log(`sauseFundingCtrl getInformationAndPreOrders -> Funding.getCampaignStatus() -> ${err}`)        
                                return returnErroMessage(`Not possible to retrieve campaign status from database`,res ) })
                        }else{
                            return returnErroMessage(`Not possible to retrieve total amount raised from database`,res )     }   })
                    .catch(err => {
                        console.log(`getInformationAndPreOrders -> Funding.getAmountRaised() -> ${err}`)
                        return returnErroMessage(`Not possible to retrieve total amount raised from database -> ${err}`,res )   })
                }else{ 
                    return returnErroMessage(`Not possible to retrieve sause price from database`,res )    }   })
            .catch(err => {
                console.log(`getInformationAndPreOrders -> Funding.getSausePrice() -> ${err}`)
                return returnErroMessage(`Not possible to retrieve sause price from database -> ${err}`,res )   })  
        }else{
            return returnErroMessage(`Not possible to retrieve preorders from database`,res )   }  })
    .catch(err => {
        console.log(`getInformationAndPreOrders sauseFundingCtrl.getPreOrders() -> ${err}`)
        return returnErroMessage(`Not possible to retrieve preorders from database -> ${err}`,res )    })
}
//=====================================================================
//NOTIFY ALL PREORDERING USERS ========================================
exports.notifyAllPreOrders = (req,res,next) => {
    console.log('sauseFundingCtrl - notifyAllPreOrders')
    Funding.getAllUserIdsForNotification('sausePreOrders')
    .then(([answer,meta])=>{
        if(answer[0].length>0){
            var ids = []
            answer[0].forEach(id =>{    ids.push(`${id.user_id}`)    })
            const notif = new Notification(null,req.body.msgToUser,req.session.User.id)
            notif.saveNewNotification()
            .then(([newNotif, newNotifMedta])=>{
                notif.setId = parseInt(newNotif[1][0].notifID)
                if(newNotif){
                    sendNotification.sendNotification({ids:ids, msg:notif.message})
                    .then(notifReturn=>{
                        notif.updateNotificationUserTable(ids)
                        if(notifReturn.data.recipients>0){
                            returnObject.data = `Notifications were sent`
                            return res.json(returnObject)
                        }else{
                            returnObject.data = `Notifications were NOT sent`
                            return res.json(returnObject)   }  })
                    .catch(err => {
                        console.log('sauseFundingCtrl - notifyAllPreOrders - sendNotification->',err)
                        return returnErroMessage(`Notifications were NOT sent`)})
                }else{
                    returnObject.data = `It was not possible to create a notification. No notifications sent`
                    return res.json(returnObject)   }   })
            .catch(err =>{
                console.log('sauseFundingCtrl - notifyAllPreOrders - saveNewNotification -> ',err)
                return returnErroMessage(`It was not possible to create a notification. No notifications sent`)     })   
        }   
    })
    .catch(err => {
        console.log('sauseFundingCtrl - notifyAllPreOrders - getAllUserIdsForNotification ',err)
    })
}
//=====================================================================
//UPDATE CAMPAIGN STATUS ==============================================
exports.updateCampaignStatus = (req,res,next) => {
    console.log('sauseFundingCtrl - updateCampaignStatus--->')
    Funding.updateCampaignStatus(req.session.User.id)
    .then(([answer,meta])=>{
        if(answer){
            returnObject.hasErrors = false
            returnObject.data = null
            returnObject.msg = `Campaign status updated!`
            return res.json(returnObject)       }
        return returnErroMessage(`Not possible to update campaign status this time!`,res)   })
    .catch(err => {
        console.log('sauseFundinCtrl -> updateCampaignStatus -> updateCampaignStatus',err)
        return returnErroMessage(`Not possible to update campaign status this time! ${err}`,res)    })
}
//=====================================================================
//LIST FOUNDERS =======================================================
exports.listFounders = (req,res,next) => {
    console.log('sauseFundingCtrl - listFounders--->')
    Funding.listFounders()
    .then(([answer,metda])=>{
        console.log(answer)
        if(answer){
                returnObject.hasErrors = false
                returnObject.data = answer[0]
                returnObject.msg = `Information retrieved!`
                return res.json(returnObject)  
        }else{
            return returnErroMessage(`Not possible to retrieve list of founders from database!`,res)    }
    })
    .catch(err => {
        console.log('sauseFundinCtrl -> listFounders -> listFounders',err)
        return returnErroMessage(`Not possible to retrieve list of founders from database! ${err}`,res)
    })
}