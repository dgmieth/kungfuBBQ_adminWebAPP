//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require(`../../../model/Developer`)
//custom functions
const checkAccesses = require('../supportFunctions/checkAccesses')
// ========================================================================================
// COOKING DATES ==========================================================================
// ========================================================================================
//fetch data
exports.allCookingCalendar = (req,res,next) => {
    console.log(process.env.COOKINGCALENDAR_FETCH_DATA.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.COOKINGCALENDAR_FETCH_DATA,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//update CookingCalendarDate
exports.updateCookingCalendarDate = (req,res,next)=>{
    console.log(process.env.UPDATE_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.UPDATE_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//create newCookingDate
exports.newCookingDate = (req,res,next) => {
    console.log(process.env.CREATE_NEW_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CREATE_NEW_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//delete cooking calendar date
exports.deleteCookingCalendarDate = (req,res,next)=>{
    console.log(process.env.DELETE_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DELETE_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//open cooking calendar date to orders
exports.openToOrders = (req,res,next) =>{
    console.log(process.env.OPEN_TO_ORDERS_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.OPEN_TO_ORDERS_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//close cooking calendar date to orders
exports.closeToOrders = (req,res,next) => {
    console.log(process.env.CLOSE_TO_ORDERS_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CLOSE_TO_ORDERS_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//choose how many meals will be cooked and send alert to the needed amount of users
exports.firstAlert = (req,res,next) => {
    console.log(process.env.SEND_FIRST_ALERT_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.SEND_FIRST_ALERT_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//send alert to users to pickup their orders
exports.secondAlert = (req,res,next) => {
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