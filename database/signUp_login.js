const Sequelize = require('sequelize')
const dataTypes = Sequelize.DataTypes;
const dbConfig = require('../databaseconfig').DB


const SignUp_login = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,
    {
        host: dbConfig.host,
        dialect:dbConfig.dialect
    })
const Login_username = SignUp_login.define( 'username',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
        },
        username:{
            type: dataTypes.STRING,
            allowNull:false
        },
        name:{
            type:dataTypes.STRING
        },
        age:{
            type:dataTypes.INTEGER
        }


    }
)
const Passwords = SignUp_login.define('password',
    {
    id:{
        type:dataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    password : dataTypes.STRING
})

Passwords.belongsTo(Login_username)
Login_username.hasOne(Passwords);


db.sync().then(()=>{
    console.log('login/Signup database Configured')
}).catch((err)=> console.error(err))

exports = module.exports= {
    Login_username , Passwords
}