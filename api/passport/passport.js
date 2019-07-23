const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const databaselogin = require('../../database/signUp_login')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')
//Serialize -
passport.serializeUser(function (user,done) {
   console.log('serialize User')
    return done(null,user.id)
})


//deseialize -
passport.deserializeUser(function (userID,done) {
    databaselogin.Login_username.findAll(
        {
            where: {id: userID}
        }
    ).then((user)=>{
        console.log('User deserialized')
       // User is returned as a 2nd Parameter
       return done(false,user)
    }).catch((err)=> console.error(err))
})

//Startergy
passport.use(new LocalStratergy({
    username: 'username',
    password: 'password'
}, function (username,password,done) {
    //Local Stratergy
    console.log('LOCAL STRATERGY')
    // username = username.split('@')[0];
    console.log(username)
    databaselogin.Login_username.findOne({
        where: {
          [sequelize.Op.or]  : [{username: username}, {email: username}]
        }
    }).then((result)=>{
        //That user will be inthe result field
        console.log(result)
            if(result == undefined)
            {
                return done(null,false,{message:"Invalid Username"})
            }

        databaselogin.Passwords.findOne({
            where:{usernameId:result.id}
        }).then((result2)=>{
            console.log("password Table ---")
            console.log(result2)
            console.log("password")
            console.log(password);

            bcrypt.compare(password,result2.password,(err,result_bcrypt)=>{
                if(err)
                {
                    return done(null,false,{message:'Error'})
                }
                if(!result_bcrypt)
                {
                    return done(null,false,{message:'Invalid Password'})
                }
                return done(null,result,{message:'User Found'})
            })

        }).catch((err)=>{
            console.error(err);
            return done(err,false)
        })
    }).catch((err)=>{
        console.error(err)
        return done(err,false)
    })
}))

exports = module.exports = {
    passport
}