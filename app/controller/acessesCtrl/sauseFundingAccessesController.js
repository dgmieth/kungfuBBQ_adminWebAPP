
//import modules

//custom functions

const checkAccesses = require('../supportFunctions/checkAccesses')
//custom return object
var returnObject = {
    hasErrors: true,
    data: null,
    msg: null
}
// ========================================================================================
// CATORING ===============================================================================
// ========================================================================================
//get all messages
exports.allAccesses = (req,res,next) => {
    console.log(process.env.FUNDING_SAUSE_ALL.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.FUNDING_SAUSE_ALL,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to access sause funding information"
        return res.status(401).json(returnObject)
    }
}