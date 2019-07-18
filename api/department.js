const route = require('express').Router();
//Database -
const Department = require('../database/models').model.Depart;

route.get('/',(req,res)=>{
    Department.findAll({

    }).then((departs)=> res.send(departs))
        .catch((err)=> console.error(err))
})

route.get('/:id',(req,res)=>{
    Department.findOne({
        where: {
            id: req.params.id
        }
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.error('Department Not Found  '+err);
    })
})

route.post('/',(req,res)=>{
    Department.create({
        dno:req.body.dno,
        name: req.body.name,
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