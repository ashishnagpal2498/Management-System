const route = require('express').Router()
const passport = require('passport')

route.get('/',(req,res)=>{
    if(req.user)
    {
        return res.send({user:req.user,messgae:'Already Logged In'})
    }
    return res.send({user:undefined,messgae: 'user Not found'})
})

route.post('/',passport.authenticate('local',{
    successRedirect: '/pages',
    failureRedirect:'/login'
}))

exports = module.exports = {
    route
}