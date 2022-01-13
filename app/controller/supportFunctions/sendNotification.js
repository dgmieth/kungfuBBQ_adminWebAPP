//npm modules
const axios = require('axios')
//modules
const Notification = require('../../../model/Notification')
const CookingCalendar = require('../../../model/CookingCalendar')
const Send = require('./sendNotification.js')//main function
exports.sendNotification = (data) => {
    console.log('sendNotif fucntion ->',data)
    return axios({
        method: 'post',
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${process.env.OSIGNAL_API_KEY}`
        },
        url: `https://onesignal.com:443/api/v1/notifications`,
        data:{
            app_id: `${process.env.OSIGNAL_APP_ID}`,
            contents: {"en": data.msg},
            channel_for_external_user_ids: "push",
            //android_channel_id: " 985d35a2-9179-4e9e-8570-a2b70b8e2a52",
            include_external_user_ids: data.ids
        }
    })
}
//send notification with msg 
exports.sendNotif = (req,res,next,cdId,notifMsg,notifType)=>{
    var returnObject = {
        hasErrors: false,
        data: null,
        msg: null}
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    CookingCalendar.getUserIdsForNotification(cdId,notifType)
    .then(([notifArray,notifArrayMeta])=>{
        if(notifArray[0].length>0){
            var ids = []
            notifArray[0].forEach(id =>{
                ids.push(`${id.userId}`)})
            const notif = new Notification(cdId,notifMsg,req.session.User.id)
            notif.saveNewNotification()
            .then(([newNotif, newNotifMedta])=>{
                notif.setId = parseInt(newNotif[1][0].notifID)
                if(newNotif){
                    Send.sendNotification({ids:ids, msg:notif.message})
                    .then(notifReturn=>{
                        notif.updateNotificationUserTable(ids)
                        notif.increasesNotificationSequencer()
                        if(notifReturn){
                            returnObject.data = `Cooking date updated, and notifications were sent`
                            return res.json(returnObject)
                        }else{
                            return returnErroMessage(`Cooking date updated, and notifications were NOT sent`)}})
                    .catch(err => {
                        console.log('sendNotification->',err)
                        return returnErroMessage(`Cooking date updated, and notifications were NOT sent`)})
                }else{
                    returnObject.data = `Cooking date updated. It was not possible to create a notification. Not notifications sent`
                    return res.json(returnObject)}})
            .catch(err =>{
                console.log('saveNewNotification -> ',err)
                return returnErroMessage(`Cooking date updated. It was not possible to create a notification. Not notifications sent`)})
        }else {
            returnObject.data = `Cooking date updated.`
            return res.json(returnObject)}})
    .catch(err=> {
        console.log('getUserIdsForNotificaiton->',err)
        return returnErroMessage(`Cooking date updated. But there was a problem while trying to evaluate the need for notifications`)})
}
