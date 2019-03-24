const express = require('express')
    , app = express();
const path = require('path')
const bodyParser = require('body-parser')

const routes = {
    department: require('./api/department').route,
    labs: require('./api/labs').route,
    vendor: require('./api/vendor').route,
    product: require('./api/product').route
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',express.static(path.join(__dirname,'public_static')))

app.use('/department',routes.department)
app.use('/lab',routes.labs)
app.use('/vendor',routes.vendor)
app.use('/product',routes.product)


app.listen(2121,()=>{
    console.log('Server has Strated At http://localhost:2121');
})