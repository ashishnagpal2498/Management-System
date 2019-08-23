const route = require('express').Router();
//Database -
// const Database = require('../database/models').model;
const Database = require('../database/model_index')

route.get('/',(req,res)=>{
    Database.Faculty.findAll({})
        .then((results)=>{
            res.send(results)
        }).catch((err)=>console.error('Error in Finding Faculty '+err))
})

route.get('/:id',(req,res)=>{
    Database.Faculty.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((result)=> res.send(result))
        .catch((err)=> console.error('Error in finding Particular Faculty '+err))
})

route.post('/',(req,res)=>{
    Database.Faculty.create({
        fid: req.body.fid,
        name : req.body.name,
        designation: req.body.designation,
        responsibility: req.body.responsibility,
        block: req.body.block,
        floor: req.body.floor
    }).then(()=>{
        console.log('Created - Faculty  ' )
        res.send({added:true})
    }).catch((err)=> console.error('Error In creating Faculty '+err))
})



exports.route = route;