const route = require('express').Router()
const passport = require('passport')

route.get('/',(req,res)=>{
    if(req.user)
    {
        return res.send('Already Logged In')
    }
    return res.send('Login page')
})

route.post('/',passport.authenticate({
    successRedirect: '/pages',
    failureRedirect:'/login'
})

exports = module.exports = {
    route
}