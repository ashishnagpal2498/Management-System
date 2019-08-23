const express = require('express')
const route = express.Router();
const Database = require('../database/model_index');




route.get('/',(req,res)=>{
    //    Show all the Products which are not issued yet -
    Database.Product.findAll({
        where: {
            issued: false
        }
    }).then((results)=>{
        //    We will get all the Products whose issued value is false -
        //
        return res.send(results);
    }).catch((err)=> console.error(err))
})


exports.route = route