const route = require('express').Router();
//Database -
const DatabaseFaculty = require('../database/models').model;

route.get('/',(req,res)=>{
    DatabaseFaculty.Faculty.findAll({})
        .then((results)=>{
            res.send(results)
        }).catch((err)=>console.error('Error in Finding Faculty '+err))
})

route.get('/:id',(req,res)=>{
    DatabaseFaculty.Faculty.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((result)=> res.send(result))
        .catch((err)=> console.error('Error in finding Particular Faculty '+err))
})

route.post('/',(req,res)=>{
    DatabaseFaculty.Faculty.create({
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