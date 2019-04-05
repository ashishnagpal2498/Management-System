const route = require('express').Router();
//Database -
const Department = require('../database/models').Depart;

route.get('/',(req,res)=>{
    Department.findAll({

    }).then((departs)=> res.send(departs))
        .catch((err)=> console.error(err))
})

route.post('/',(req,res)=>{
    Department.create({
        dname: req.body.dname,
        hod: req.body.hod,
        block:req.body.block,

    }).then((results)=> {   //console.log(results)
        res.redirect('.')})
        .catch((err)=> console.error(err))
})


exports.route=route;

/*

dname:CSE
hod:Sourabh
block:4

 */