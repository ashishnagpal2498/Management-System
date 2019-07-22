const express = require('express')
const route = express.Router();
const databaseProduct = require('../database/models2').model;
const IssueDatabase = require('../database/model_issue').model;
const DatabaseLabs = require('../database/models').model;
const sequelize = require('sequelize')


route.get('/',(req,res)=>{
    //    Show all the Products which are not issued yet -
    databaseProduct.Product.findAll({
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