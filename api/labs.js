const route = require('express').Router();
//Database -
const Labs = require('../database/models').model.Labs;
const Department = require('../database/models').model.Depart;

route.get('/',(req,res)=>{
    Labs.findAll({

    }).then((labs)=> res.send(labs))
        .catch((err)=> console.error(err))
})

route.post('/',(req,res)=>{
    Labs.create({
        labname: req.body.labname,
        technician: req.body.technician,
        block:req.body.block,
        floor:req.body.floor,
        //Foreign Key -
        departmentDno :req.body.departmentDno
    }).then((results)=> {   //console.log(results)
        res.redirect('.')})
        .catch((err)=> console.error(err))
})

route.post('/:depart',(req,res)=>{
    let departmentname = req.params.depart;
    Department.findAll({
        where:{
            dname:departmentname
        },
        include: [Labs]
    }).then((results)=>{ res.send(results.labname)})
        .catch((err)=> console.error(err))
})


exports.route=route;


/*
technician:Gupta
labname:Cse1stfloor
block:5
floor:1
departmentDno:1
*/

/* Department

hod:Sourabh
block:4
dname:Cse

 */
