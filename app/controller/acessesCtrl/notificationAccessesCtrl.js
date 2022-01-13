//import modules

//custom functions
const checkAccesses = require('../supportFunctions/checkAccesses')
// ========================================================================================
// COOKING DATES ==========================================================================
// ========================================================================================
//fetch data
exports.sendNotification = (req,res,next) => {
    console.log(process.env.NOTIFICATION_SEND.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.NOTIFICATION_SEND,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//send notif to all
exports.sendNotifToAll = (req,res,next)=>{
    console.log(process.env.SEND_SECOND_ALERT_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.SEND_SECOND_ALERT_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
