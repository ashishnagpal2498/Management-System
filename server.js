const express = require('express')
    , app = express()
    , path = require('path')
const {PORT} = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('./api/passport/passport').passport
const session = require('express-session')
//const models = require('./database/model_index')

const routes = {
    login :require('./api/login/login').route,
    signup: require('./api/login/signup').route,
    department: require('./api/department').route,
    lab: require('./api/lab').route,
    vendor: require('./api/vendor').route,
    product: require('./api/product').route,
    logout: require('./api/logout').route,
    issue: require('./api/mod_routes/issue').route,
    transfer: require('./api/mod_routes/transfer').route,
    faculty : require('./api/faculty').route,
    return_val : require('./api/mod_routes/return').route,
    store: require('./api/store').route
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors()) //Cross side Scripting
app.use('/',express.static(path.join(__dirname,'public_static')))
app.use(session({secret: 'Passport Login'}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// app.use((req,res,next)=>{
//     if(req.user)
//     {
//         res.send({user:req.user})
//     }
//     next();
// })
app.use('/login',routes.login)
app.use('/signup',routes.signup)
app.use('/department',routes.department)
app.use('/lab',routes.lab)
app.use('/vendor',routes.vendor)
app.use('/product',routes.product)
 app.use('/issue',routes.issue)
app.use('/logout',routes.logout);
app.use('/transfer',routes.transfer);
app.use('/faculty',routes.faculty);
app.use('/Return',routes.return_val);
app.use('/store',routes.store)
//All routes are check and request doesn't match any of the Route -
app.use((req,res)=>{
    res.send({message:'Error, Cannot find path you are looking for'})
})

app.listen(PORT,()=>{
    console.log('Server has Started At http://localhost:'+PORT);
})