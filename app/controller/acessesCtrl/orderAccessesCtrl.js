
//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require(`../../../model/Developer`)
//custom functions
const destroySession = require('../supportFunctions/destroySession')
const checkAccesses = require('../supportFunctions/checkAccesses')
// ========================================================================================
// ORDER ==================================================================================
// ========================================================================================
//fetch orders
exports.fetchOrdersForActiveFinishedCookingDates = (req,res,next) => {
    console.log(process.env.ORDER_FETCH_ORDERS.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_FETCH_ORDERS,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//delete order
exports.deleteOrder = (req,res,next) => {
    console.log(process.env.ORDER_DELETE_ORDER.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_DELETE_ORDER,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//delivere order 
exports.deliverOrder = (req,res,next) => {
    console.log(process.env.ORDER_DELIVER_ORDER.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_DELIVER_ORDER,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}