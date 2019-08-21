const route = require('express').Router()
const passport = require('../passport/passport').passport

route.get('/',(req,res)=>{
   // console.log(req);
    if(req.user)
    {
        return res.send({user:req.user})
    }
    return res.send({user:false,message: 'user Not found'})
})

route.post('/',(req,res,next)=>{
        console.log('POST REQ LOGIN')
        console.log(req.body)
        passport.authenticate('local',
            {
                username: req.body.username,
                password: req.body.password
            },
            // {
            // successRedirect: '.',
            // failureRedirect:'/login'
            // }
            (err,user,info)=>{
            console.log(user)
                console.log('error value ')
                console.log(err)
                if(err)
                {
                    console.log('INSIDE ERROR ')
                    //Query was Successfull but user has entered Wrong Details
                  return  res.send({user:null,userFound:false})
                }
                if(!user)
                {
                    //user is false

                    return  res.send({user:null,userFound:false})
                }
                else
                {   console.log('INSIDE ELSE PART')
                    req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return  res.send({user:user,userFound:true})
                    });
                }
            })(req,res,next)
})

exports = module.exports = {
    route
}