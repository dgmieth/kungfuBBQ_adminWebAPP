// ======================================================================
// ROOT PAGE ============================================================
// ======================================================================
//render login page
exports.renderLoginPage = (req,res,next) => {
    res.render('login', { pageTitle: `Log-In` })
}
// ======================================================================
// ADMINISTRATIVE PAGES =================================================
// ======================================================================
//administrative login page
exports.renderAdmiLogin = (req,res,next)=> {
    res.render('admLogin',{ pageTitle: `Administrative Log-In` })
} 
exports.admDashboard = (req,res,next) => {
    res.render('admDashboard',{ pageTitle: `Administrative Log-In` })
}
// ======================================================================
// DEVELOPER PAGES ======================================================
// ======================================================================
//developer login page
exports.renderDeveloperLogin = (req,res,next)=> {
    res.render('developerLogin',{ pageTitle: `Developer Log-In` })
} 
//developer dashboard page
exports.developerDashboard = (req,res,next)=> {
    res.render('developerDashboard', {pageTitle: 'Developer dashboard'})
} 


