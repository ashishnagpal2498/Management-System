const express = require('express')
    , app = express();
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('./api/passport/passport').passport
const session = require('express-session')

const routes = {
    department: require('./api/department').route,
    labs: require('./api/labs').route,
    vendor: require('./api/vendor').route,
    product: require('./api/product').route,
    login :require('./api/login/login').route,
    signup: require('./api/login/signup').route
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/',express.static(path.join(__dirname,'public_static')))
app.use(session({secret: 'Passport Login'}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/login',routes.login)
app.use('/signup',routes.signup)
app.use('/department',routes.department)
app.use('/lab',routes.labs)
app.use('/vendor',routes.vendor)
app.use('/product',routes.product)
//All routes are check and request doesn't match any of the Route -
app.use((req,res)=>{
    res.send({message:'Error, Cannot find path you are looking for'})
})

app.listen(2121,()=>{
    console.log('Server has Strated At http://localhost:2121');
})