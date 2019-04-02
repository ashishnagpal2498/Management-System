const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const databaselogin = require('../../database/signUp_login')

//Serialize -
passport.serializeUser(function (user,done) {
    done(null,user.id)
})


//deseialize -
passport.deserializeUser(function (userID,done) {
    databaselogin.Login_username.findAll(
        {
            where: {id: userID}
        }
    ).then((user)=>{
        console.log('User deserialized')
        done(user,false)
    })
})

//Startergy
passport.use(new LocalStratergy({
    username: username,
    password:password
}, function (username,password,done) {
    //Local Stratergy
    databaselogin.Login_username.findAll({
        where: {username:username}
    }).then((result)=>{
        //That user will be inthe result field
        console.log(result)
        databaselogin.Passwords.findAll({
            where:{usernameId:result.id}
        }).then((result2)=>{
            if(!result2.password===password)
            {
                return done(null,false,{message:'Invalid Password'})
            }
            return done(null,result)
        }).catch((err)=>{
            console.log(err);
            return done(err,false)
        })
    }).catch((err)=>{
        console.error(err)
        return done(err,false)
    })
}))