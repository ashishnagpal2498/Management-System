const route = require('express').Router();
//Database -
// const Database = require('../database/models').model.Depart;
const Database = require('../database/model_index').Depart
route.get('/',(req,res)=>{
    Database.findAll({

    }).then((departs)=> res.send(departs))
        .catch((err)=> console.error(err))
})

route.get('/:id',(req,res)=>{
    Database.findOne({
        where: {
            id: req.params.id
        }
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.error('Database Not Found  '+err);
    })
})

route.post('/',(req,res)=>{
    Database.create({
        dno:req.body.dno,
        name: req.body.name,
        hod: req.body.hod,
        block:req.body.block,

    }).then((results)=> {   //console.log(results)
            res.send({added:true})
    })
        .catch((err)=> {console.error(err)
        res.send({added:false})
        })
})


exports.route=route;

/*

dname:CSE
hod:Sourabh
block:4

 */