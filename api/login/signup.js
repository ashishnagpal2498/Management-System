const route = require('express').Router()
const LoginDatabase = require('../../database/signUp_login')
const path = require('path')
const uid = require('uid')
const bcrypt = require('bcrypt')
const saltRounds = 10;
route.get('/',(req,res)=>{
    //If the user is already logged in -
    if(req.user)
    {
      return  res.send({message:'Logged In'})
    }
    return res.sendFile(path.join(__dirname,'../../public_static/signup.html'))
})

route.post('/',(req,res)=>{
    // let uName = req.body.signupemail
    LoginDatabase.Login_username.create({
        email: req.body.signupemail,
        username: req.body.signupusername,
        name: req.body.signupname,
        designation:req.body.designation,
        department: req.body.signupdept
    },{returning:true}).then((result)=>{
        bcrypt.hash(req.body.signuppass,saltRounds)
            .then((hash)=>{
                LoginDatabase.Passwords.create({
                    password:hash,
                    usernameId: result.id
                }).then(()=> {
                    console.log('User Added')
                    return res.send({userAdded:true,message: "User Added Successfully"})
                }).catch((err)=>
                {console.error('Password'+err)
                    if (err)
                        return res.send({userAdded:false,message:"user cannot be added"})
                })
            }).catch((err3)=>{
                console.error('Error In Bcrypt'+err3);
        })
        }).catch((err2)=> {
            console.error('Cannot add user' + err2)
        if(err2) return res.send({userAdded:false,message:"Error , cannot be added"})
        })

})


exports = module.exports = {
    route
}

/*
Data Input
username:admin
name:abc
age:21
password:password

 */