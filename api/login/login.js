const route = require('express').Router()
const passport = require('../passport/passport').passport

route.get('/',(req,res)=>{
   // console.log(req);
    if(req.user)
    {
        return res.send({user:req.user})
    }
    return res.send({user:undefined,messgae: 'user Not found'})
})

route.post('/',passport.authenticate('local',{
    successRedirect: '.',
    failureRedirect:'/login'
}))

exports = module.exports = {
    route
}