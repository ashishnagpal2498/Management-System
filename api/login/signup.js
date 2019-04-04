const route = require('express').Router()
const LoginDatabase = require('../../database/signUp_login')
const path = require('path')
const uid = require('uid')

route.get('/',(req,res)=>{
    //If the user is already logged in -
    if(req.user)
    {
      return  res.send({message:'Logged In'})
    }
    return res.sendFile(path.join(__dirname,'../../public_static/signup.html'))
})

route.post('/',(req,res)=>{
    let uniqueId = uid(10)
    let uName = req.body.username
    uName = uName.split('@')[0]
    LoginDatabase.Login_username.create({
        id: uniqueId,
        username: uName,
        name: req.body.name,
        age: req.body.age
    }).then(()=>{
        LoginDatabase.Passwords.create({
            password:req.body.password,
            usernameId: uniqueId
        }).then(()=> {console.log('User Added')
            res.redirect('/login')})
            .catch((err)=> console.error('Password'+err))
    }).catch((err)=> console.error('Cannot add user' + err))
})


exports = module.exports = {
    route
}