const Sequelize = require('sequelize')
const dataTypes = Sequelize.DataTypes;
const dbConfig = require('../config')


const SignUp_login = new Sequelize(dbConfig.database_URI)
const Login_username = SignUp_login.define( 'username',
    {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey:true,
        },

        email:{
          type:dataTypes.STRING,
          allowNull:false
        },
        username:{
            type: dataTypes.STRING,
            allowNull:false
        },
        name:{
            type:dataTypes.STRING
        },
        designation:{
            type:dataTypes.STRING
        },
        department:{
            type: dataTypes.STRING
        }

    }
)
const Passwords = SignUp_login.define('password',
    {
    id:{
        type:dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        //autoIncrement:true,
        primaryKey: true
    },
    password : dataTypes.STRING
})

Passwords.belongsTo(Login_username)
Login_username.hasOne(Passwords);


SignUp_login.sync({alter:true}).then(()=>{
    console.log('login/Signup database Configured')
}).catch((err)=> console.error('login,signup'+err))

exports = module.exports= {
    Login_username , Passwords
}