
//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require(`../../../model/Developer`)
//custom functions
const destroySession = require('../supportFunctions/destroySession')
const checkAccesses = require('../supportFunctions/checkAccesses')
// ========================================================================================
// CATORING ===============================================================================
// ========================================================================================
//get all messages
exports.fetchAllMessages = (req,res,next) => {
    console.log(process.env.CATORING_FETCH_ALL_MESSAGES.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_FETCH_ALL_MESSAGES,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//readMessage
exports.readMessage = (req,res,next) => {
    console.log(process.env.CATORING_READ_MESSAGE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_READ_MESSAGE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//deleteMessage
exports.deleteMessage = (req,res,next) => {
    console.log(process.env.CATORING_DELETE_MESSAGE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_DELETE_MESSAGE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}
//archiveMessage
exports.archiveMessage = (req,res,next) => {
    console.log(process.env.CATORING_ARCHIVE_MESSAGE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_ARCHIVE_MESSAGE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        next()
    }
}