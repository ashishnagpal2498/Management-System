const route = require('express').Router()
const IssuedDatabase = require('../../database/model_issue').model
const DeptorLabs = require('../../database/models').model
const ProductModel = require('../../database/models2').model
const sequelize = require('sequelize')
route.get('/',(req,res)=>{
//    Show all the items which are issued to be transfered -
    let issuedItems = {
        labs:null,
        department:null
    }
    IssuedDatabase.IssuedLab.findAll({
        include: [{model: ProductModel.Product},{model:DeptorLabs.Labs}]
    }).then((resultLabs)=>{
    //    Getting all the Faculty which are issued computers -
        IssuedDatabase.IssueFaculty.findAll({
                include: [{
                    model: DeptorLabs.Faculty
                }, {model:ProductModel.Product}]
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
        IssuedDatabase.IssuedLab.findOne(
            {
            where: {
                id: req.params.id
            }
            ,include: [{model:DeptorLabs.Labs},{model:ProductModel.Product}]
        })
            .then((result)=>{ res.send(result)})
            .catch((err)=> console.error('Error In finding Issued Product at Transfer '+err))
    }
    //Faculty -
    else {
        IssuedDatabase.IssueFaculty.findOne(
            {
                where: {
                    id: req.params.id
                }
                ,include: [{model:DeptorLabs.Faculty},{model:ProductModel.Product}]
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
        IssuedDatabase.IssuedLab.update({
                qty: sequelize.literal(`qty - ${req.body.transferQty}`)
            },
            {
                where:{
                    labId: req.body.senderLabId,
                    productId : req.body.productId
                },
            }).then(()=> {
            console.log('Senders Result------------------>>')
            IssuedDatabase.IssuedLab.destroy({
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
        IssuedDatabase.IssueFaculty.update({
                qty: sequelize.literal(`qty - ${req.body.transferQty}`)
            },
            {
                where:{
                    facultyId: req.body.senderFacultyId,
                    productId : req.body.productId
                },
            }).then((senderResult)=> {
            console.log('Senders Result------------------>>')
            IssuedDatabase.IssueFaculty.destroy({
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
        IssuedDatabase.IssuedLab.findOne({
            where: {
                productId : req.body.productId,
                labId: req.body.receiver_labId
            }
        }).then((result2)=>{
            //If the result is found
            if(result2 == undefined)
            {
                //create -
                IssuedDatabase.IssuedLab.create({
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
                IssuedDatabase.IssuedLab.update({
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
        IssuedDatabase.IssueFaculty.findOne({
            where: {
                productId : req.body.productId,
                facultyId: req.body.receiver_facultyId
            }
        }).then((result2)=>{
            //If the result is found
            if(result2 == undefined)
            {
                //create -
                IssuedDatabase.IssueFaculty.create({
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
                IssuedDatabase.IssueFaculty.update({
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


exports = module.exports = {
    route
}