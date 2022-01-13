//npm modules
const express = require('express')
//creation of router
const servicesRouter = express.Router()
//import controller
const indexServicesCtrl = require('../controller/indexServicesCtrl')
const authCtrl = require('../controller/authCtrl')
//accesses controllers
const userAccessesCtrl = require('../controller/acessesCtrl/userAcessesCtrl')
const cookingDatesAccessesCtrl = require('../controller/acessesCtrl/cookingDatesAccessesCtrl')
const orderAccessesCtrl = require('../controller/acessesCtrl/orderAccessesCtrl')
const dishesAccessesCtrl = require('../controller/acessesCtrl/dishesAccessesCtrl')
const catoringAccessesCtrl = require('../controller/acessesCtrl/catoringAccessesCtrl')
const notificationAccessesCtrl = require('../controller/acessesCtrl/notificationAccessesCtrl')
// ======================================================================
// ADMINISTRATIVE ROUTES ================================================
// ======================================================================
//USERS
servicesRouter.get('/allUsers', authCtrl.isAuth, userAccessesCtrl.viewActiveUsers, indexServicesCtrl.allUsers)
servicesRouter.post('/deleteUserById',authCtrl.isAuth, userAccessesCtrl.deleteUser, indexServicesCtrl.deleteUserById)
servicesRouter.post('/editedUserInfo', authCtrl.isAuth, userAccessesCtrl.editUserInformation, indexServicesCtrl.editedUserInfo)
servicesRouter.post('/invitationCode', authCtrl.isAuth, userAccessesCtrl.invitationCode, indexServicesCtrl.invitationCode)
servicesRouter.post('/updateUserAccesses', authCtrl.isAuth, userAccessesCtrl.updateUserAccesses, indexServicesCtrl.updateUserAccesses)
//COOKING DATES
servicesRouter.get('/allCookingCalendar',authCtrl.isAuth, cookingDatesAccessesCtrl.allCookingCalendar, indexServicesCtrl.allCookingCalendar)
servicesRouter.post('/updateCookingCalendarDate',authCtrl.isAuth, cookingDatesAccessesCtrl.updateCookingCalendarDate, indexServicesCtrl.updateCookingCalendarDate)
servicesRouter.post('/newCookingDate',authCtrl.isAuth, cookingDatesAccessesCtrl.newCookingDate, indexServicesCtrl.newCookingDate)
servicesRouter.post('/deleteCookingCalendarDate',authCtrl.isAuth, cookingDatesAccessesCtrl.deleteCookingCalendarDate, indexServicesCtrl.deleteCookingCalendarDate)
servicesRouter.post('/openToOrders',authCtrl.isAuth, cookingDatesAccessesCtrl.openToOrders, indexServicesCtrl.openToOrders)
servicesRouter.post('/closeToOrders',authCtrl.isAuth, cookingDatesAccessesCtrl.closeToOrders, indexServicesCtrl.closeToOrders)
servicesRouter.post('/firstAlert',authCtrl.isAuth, cookingDatesAccessesCtrl.firstAlert, indexServicesCtrl.firstAlert)
servicesRouter.post('/secondAlert',authCtrl.isAuth, cookingDatesAccessesCtrl.secondAlert, indexServicesCtrl.secondAlert)
//ORDER
servicesRouter.get('/fetchOrdersForActiveFinishedCookingDates',authCtrl.isAuth,orderAccessesCtrl.fetchOrdersForActiveFinishedCookingDates, indexServicesCtrl.fetchOrdersForActiveFinishedCookingDates)
servicesRouter.post('/deleteOrder',authCtrl.isAuth,orderAccessesCtrl.deleteOrder, indexServicesCtrl.deleteOrder)
servicesRouter.post('/deliverOrder',authCtrl.isAuth,orderAccessesCtrl.deliverOrder, indexServicesCtrl.deliverOrder)
servicesRouter.post('/reimburse',authCtrl.isAuth,orderAccessesCtrl.deliverOrder, indexServicesCtrl.reimburse)
//DISHES
servicesRouter.get('/fetchAllDishes',authCtrl.isAuth, dishesAccessesCtrl.fetchAllDishes, indexServicesCtrl.fetchAllDishes)
servicesRouter.post('/newDish',authCtrl.isAuth, dishesAccessesCtrl.newDish, indexServicesCtrl.newDish)
servicesRouter.post('/editDish',authCtrl.isAuth, dishesAccessesCtrl.editDish, indexServicesCtrl.editDish)
servicesRouter.post('/deleteDish',authCtrl.isAuth, dishesAccessesCtrl.deleteDish, indexServicesCtrl.deleteDish)
//CATORING
servicesRouter.get('/fetchAllMessages', authCtrl.isAuth, catoringAccessesCtrl.fetchAllMessages, indexServicesCtrl.fetchAllMessages)
servicesRouter.post('/readMessage', authCtrl.isAuth, catoringAccessesCtrl.readMessage, indexServicesCtrl.readMessage)
servicesRouter.post('/deleteMessage', authCtrl.isAuth, catoringAccessesCtrl.deleteMessage, indexServicesCtrl.deleteMessage)
servicesRouter.post('/archiveMessage', authCtrl.isAuth, catoringAccessesCtrl.archiveMessage, indexServicesCtrl.archiveMessage)
//NOTIFICATIONS
servicesRouter.post('/sendNotification', authCtrl.isAuth, notificationAccessesCtrl.sendNotification, indexServicesCtrl.sendNotification)
servicesRouter.post('/sendNotifToAll',authCtrl.isAuth, notificationAccessesCtrl.sendNotifToAll, indexServicesCtrl.sendNotifToAll)
// ======================================================================
// SERVER CRONTAB ROUTES =====================================================
// ======================================================================
servicesRouter.get('/crontabNotification', indexServicesCtrl.crontabNotification)
// ======================================================================
// DEVELOPER ROUTES =====================================================
// ======================================================================
servicesRouter.get('/developingInformation', authCtrl.isAuth, indexServicesCtrl.developingInformation)
servicesRouter.post('/postStartEndDeveloping', authCtrl.isAuth, indexServicesCtrl.postStartEndDeveloping)
servicesRouter.post('/updateDeveloper', indexServicesCtrl.updateDeveloper)

//exporting router
module.exports = servicesRouter










