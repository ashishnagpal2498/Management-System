const express = require('express')
    , app = express();
const path = require('path')
const bodyParser = require('body-parser')

const routes = {
    department: require('./api/department').route
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use('/department',routes.department)


app.listen(2121,()=>{
    console.log('Server has Strated At http://localhost:2121');
})