const route = require('express').Router();
//Database -
const Database_Lab = require('../database/model_index').Labs;
const {Op} = require('sequelize')

route.get('/',(req,res)=>{
    Database_Lab.findAll({

    }).then((labs)=> res.send(labs))
        .catch((err)=> console.error(err))
})

route.get('/:id',(req,res)=>{
    Database_Lab.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    ).then((result)=>{
        //Database_Lab to be send requested by transfer menu for now
        res.send(result)
    }).catch(err => console.error(err))
})

route.post('/',(req,res)=>{
    Database_Lab.create({
        labno:req.body.labNo,
        name: req.body.name,
        technician: req.body.technician,
        block:req.body.block,
        floor:req.body.floor,
        //Foreign Key -
        departmentId :req.body.departmentId
    }).then((results)=> {   //console.log(results)
        res.send({added:true})})
        .catch((err)=> console.error(err))
})

// route.post('/:depart',(req,res)=>{
//     let departmentname = req.params.depart;
//     Department.findAll({
//         where:{
//             dname:departmentname
//         },
//         include: [Database_Lab]
//     }).then((results)=>{ res.send(results.labname)})
//         .catch((err)=> console.error(err))
// })

route.post('/filter',(req,res)=>{
   console.log(req.body)
    Database_Lab.findAll({
        where:{
            [Op.and] :{
                departmentId: {
                    [Op.or] : req.body.departmentId
                },
                block: {
                    [Op.or] : req.body.block
                },
                floor:{
                    [Op.or] :req.body.floor
                }
            }
        }
    }).then((labs)=> {res.send(labs)})
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

/*

labname:l1
technician:Amit
block:4
floor:1
departmentDno:1

 */

//New Addition

/*
labno:90
name:Cse WE
technician:Rohan
block:4
floor:2
departmentId:1
 */
