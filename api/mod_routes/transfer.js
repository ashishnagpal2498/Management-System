const route = require('express').Router()
// const Database = require('../../database/model_issue').model
// const Database = require('../../database/models').model
// const Database = require('../../database/models2').model
const Database = require('../../database/model_index')
const sequelize = require('sequelize')
route.get('/',(req,res)=>{
//    Show all the items which are issued to be transfered -
    let issuedItems = {
        labs:null,
        department:null
    }
    Database.IssuedLab.findAll({
        include: [{model: Database.Product},{model:Database.Labs}]
    }).then((resultLabs)=>{
    //    Getting all the Faculty which are issued computers -
        Database.IssueFaculty.findAll({
                include: [{
                    model: Database.Faculty
                }, {model:Database.Product}]
            }
        )
            .then((resultFaculty)=>{
                if(resultLabs[0]!==undefined)
                {
                    issuedItems.labs = resultLabs
                }
                if(resultFaculty[0]!==undefined)
                {
                    issuedItems.department = resultFaculty
                }
                res.send(issuedItems)
            })
            .catch((err)=>{console.log("err in Department"); console.error(err)})
    }).catch((err2)=>{ console.log("err in labs"); console.error(err2)})
})

//
route.get('/:id;:deptOrlab',(req,res)=>{
    //This will get an Id -
    //Issue
    //Configure This that if it is possible
    console.log(req.params.id)
    console.log(req.params.deptOrlab)
    if(req.params.deptOrlab==='lab')
    {
        // Call the issue Lab Database -
        Database.IssuedLab.findOne(
            {
            where: {
                id: req.params.id
            }
            ,include: [{model:Database.Labs},{model:Database.Product}]
        })
            .then((result)=>{ res.send(result)})
            .catch((err)=> console.error('Error In finding Issued Product at Transfer '+err))
    }
    //Faculty -
    else {
        Database.IssueFaculty.findOne(
            {
                where: {
                    id: req.params.id
                }
                ,include: [{model:Database.Faculty},{model:Database.Product}]
            })
            .then((result)=>{ res.send(result)})
            .catch((err)=> console.error('Error In finding Issued Product at Transfer '+err))
    }
})

//Post request comes from the Form of submit -
//Once Submit there will be two
route.post('/',(req,res)=>{
    //Find the product in the lab which is to be updated -
   //Category -
    console.log(req.body)
    if(req.body.senderCategory==='lab')
    {
    //Workin here - SENDER IS FROM THE LAB
        Database.IssuedLab.update({
                qty: sequelize.literal(`qty - ${req.body.transferQty}`)
            },
            {
                where:{
                    labId: req.body.senderLabId,
                    productId : req.body.productId
                },
            }).then(()=> {
            console.log('Senders Result------------------>>')
            Database.IssuedLab.destroy({
                where: {
                    qty: 0,
                    labId: req.body.senderLabId,
                    productId : req.body.productId
                }
            }).then(()=>{ console.log('Value Destroyed')}).catch((err3)=> console.error('Cannot Destroy '+err3))
            console.log('SENDER UPDATED SUCCESSFULLY - LAB - ')

            // console.log(senderResult)
        }).catch((err_sender_lab)=>{
            console.error('Error in Updating Lab - Sender '+err_sender_lab)
        })


    }
    //If the sender is Faculty -
    else
    {
        //SENDER- FACULTY -
        Database.IssueFaculty.update({
                qty: sequelize.literal(`qty - ${req.body.transferQty}`)
            },
            {
                where:{
                    facultyId: req.body.senderFacultyId,
                    productId : req.body.productId
                },
            }).then((senderResult)=> {
            console.log('Senders Result------------------>>')
            Database.IssueFaculty.destroy({
                where: {
                    qty: 0,
                    facultyId: req.body.senderFacultyId,
                    productId : req.body.productId
                }
            }).then(()=>{ console.log('Value Destroyed')}).catch((err3)=> console.error('Cannot Destroy '+err3))
            console.log('SENDER UPDATED SUCCESSFULLY - FACULTY ')

            // console.log(senderResult)
        }).catch((err_sender_lab)=>{
            console.error('Error in Updating Lab - Sender '+err_sender_lab)
        })


    }
    if(req.body.receiverCategory==='lab')
    {
        //-----> To be transfered To lab -
        Database.IssuedLab.findOne({
            where: {
                productId : req.body.productId,
                labId: req.body.receiver_labId
            }
        }).then((result2)=>{
            //If the result is found
            if(result2 == undefined)
            {
                //create -
                Database.IssuedLab.create({
                    qty: req.body.transferQty,
                    productId: req.body.productId,
                    labId: req.body.receiver_labId
                }).then(()=>{
                    console.log('RECEIVER CREATED NEW ROW OF LAB -  SUCCESSFULLY')

                    res.send({message:"Transfer Successful",transfer:true})

                }).catch((err_r)=>{
                    console.error('CANNOT ADD -' +err_r)
                })
            }
            else
            {
                Database.IssuedLab.update({
                    qty : sequelize.literal(`qty + ${req.body.transferQty}`)
                },{
                    where: {
                        productId : req.body.productId,
                        labId: req.body.receiver_labId
                    }
                }).then(()=>{
                    //Final result - UPDATED -
                    console.log('TRANSFER SUCCESSFUL IN EXISTING LAB ROW  ')
                    res.send({message:"Transfer Successful",transfer:true})

                }).catch((err)=>{
                    console.log('Cannot update -'+err)
                })
            }
        }).catch((err_receiver)=>{
            //Find ka catch
            console.error('Cannot FIND LAB WITH THAT ID RECEIVER '+err_receiver)
        })


    }
    else {
        Database.IssueFaculty.findOne({
            where: {
                productId : req.body.productId,
                facultyId: req.body.receiver_facultyId
            }
        }).then((result2)=>{
            //If the result is found
            if(result2 == undefined)
            {
                //create -
                Database.IssueFaculty.create({
                    qty: req.body.transferQty,
                    productId: req.body.productId,
                    facultyId: req.body.receiver_facultyId
                }).then(()=>{
                    console.log('RECEIVER CREATED NEW ROW OF FACULTY - SUCCESSFULLY')
                    res.send({message:"Transfer Successful",transfer:true})
                }).catch((err_r)=>{
                    console.error('CANNOT ADD -' +err_r)
                })
            }
            else
            {
                Database.IssueFaculty.update({
                    qty : sequelize.literal(`qty + ${req.body.transferQty}`)
                },{
                    where: {
                        productId : req.body.productId,
                        facultyId: req.body.receiver_facultyId
                    }
                }).then(()=>{
                    //Final result - UPDATED -
                    console.log('TRANSFER SUCCESSFUL - EXISTING ROW FACULTY UPDATED')
                    res.send({message:"Transfer Successful",transfer:true})
                }).catch((err)=>{
                    console.log('Cannot update -'+err)
                })
            }
        }).catch((err_receiver)=>{
            //Find ka catch
            console.log(err_receiver)
        })
    }
})

route.post('/filter',(req,res)=>{
    let issuedItems = {
        labs:null,
        department:null
    }
    console.log(req.body)
    Database.IssuedLab.findAll({
        where:{
          labId: {
              [sequelize.Op.or] : req.body.labId
          }
        },
        include: [{model: Database.Product},{model:Database.Labs}]
    }).then((resultLabs)=>{
        //    Getting all the Faculty which are issued computers -
        Database.IssueFaculty.findAll({
            where:{
              facultyId:{
                  [sequelize.Op.or] : req.body.facultyId
              }
            },
            include: [{
                    model: Database.Faculty
                }, {model:Database.Product}]
            }
        )
            .then((resultFaculty)=>{
                if(resultLabs[0]!==undefined)
                {
                    issuedItems.labs = resultLabs
                }
                if(resultFaculty[0]!==undefined)
                {
                    issuedItems.department = resultFaculty
                }
                if(req.body.facultyId===undefined)
                {
                    issuedItems.department = []
                }
                if(req.body.labId===undefined)
                {
                    issuedItems.labs = []
                }
                res.send(issuedItems)
            })
            .catch((err)=>{console.log("err in Department"); console.error(err)})
    }).catch((err2)=>{ console.log("err in labs"); console.error(err2)})
})


exports = module.exports = {
    route
}