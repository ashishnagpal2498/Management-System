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
    //    Getting all the labs which are issued computers -
        IssuedDatabase.IssuedDepartment.findAll(
            {
                include: [{
                    model: DeptorLabs.Depart
                }, {model:ProductModel.Product}]
            }
        )
            .then((resultDept)=>{
                if(resultLabs[0]!==undefined)
                {
                    issuedItems.labs = resultLabs
                }
                if(resultDept[0]!==undefined)
                {
                    issuedItems.department = resultDept
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
})

//Post request comes from the Form of submit -
//Once Submit there will be two
route.post('/',(req,res)=>{
    //Find the product in the lab which is to be updated -
    console.log(req.body)
    IssuedDatabase.IssuedLab.update({
        qty: sequelize.literal(`qty - ${req.body.transferQty}`)
    },
        {
            where:{
                labId: req.body.senderLabId,
                productId : req.body.productId
            },
            returning : true,
            plain: true
        }).then((senderResult)=>{
            console.log('Senders Result------------------>>')
            // console.log(senderResult)
                IssuedDatabase.IssuedLab.destroy({
                    where: {
                        qty: 0,
                        labId: req.body.senderLabId,
                        productId : req.body.productId
                    }
                }).then(()=>{ console.log('Value Destroyed')}).catch((err3)=> console.error('Cannot Destroy '+err3))
        console.log('SENDER UPDATED SUCCESSFULLY')
        IssuedDatabase.IssuedLab.findOne({
            where: {
                productId : req.body.productId,
                labId: req.body.receiverLabId
            }
        }).then((result2)=>{
            //If the result is found
            if(result2 == undefined)
            {
                //create -
                IssuedDatabase.IssuedLab.create({
                    qty: req.body.transferQty,
                    productId: req.body.productId,
                    labId: req.body.receiverLabId
                }).then(()=>{
                    console.log('RECEIVER CREATED SUCCESSFULLY')
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
                        labId: req.body.receiverLabId
                    }
                }).then(()=>{
                    //Final result - UPDATED -
                    res.send({message:"Transfer Successful",transfer:true})
                }).catch((err)=>{
                    console.log('Cannot update -'+err)
                })
            }
        }).catch((err_receiver)=>{
            //Find ka catch
            console.log(err_receiver)
        })
            // IssuedDatabase.IssuedLab.upsert({
            //     qty: sequelize.literal(`qty + ${req.body.transferQty}`),
            //     productId : req.body.productId,
            //     labId: req.body.receiverLabId
            // },{
            //     where: {
            //         productId : req.body.productId,
            //         labId: req.body.receiverLabId
            //     }
            // }).then((result)=>{
            //     console.log('ROW CREATED OR UPDATED ')
            //     res.send({message:"Transfer Successfull",transfer:true})
            // })
            //     .catch((err_add)=>{
            //         console.error('Cannot Create Or Update Value '+err_add)
            //         res.send({message:err_add,transfer:false})
            //     })

    }).catch((err)=>{
        console.log('Failed To update Sender')
        res.status(400).send({message:"Transfer Failed Due to Sender Update",transfer:false})
    })
    // IssuedDatabase.IssuedLab.findOne(
    //     {
    //         where : {
    //             labId: req.body.senderLabId,
    //             productId : req.body.productId
    //         }
    //     }
    // ).then((result1)=>{
    //     console.log(result1.qty)
    //     //
    //     let rem_qty = result1.qty -  req.body.transferQty;
    //     IssuedDatabase.IssuedLab.update({
    //         qty: rem_qty
    //         },
    //     {
    //         where:{
    //             labId: req.body.senderLabId,
    //                 productId : req.body.productId
    //         }
    //     //Adding 1 more lab and the check -
    //     }).then((result_update)=>{
    //         console.log('Result has been updated in Sender Lab')
    //
    //     //    Lab 2 selected mein quantity increase or create the row
    //         IssuedDatabase.IssuedLab.findOne(
    //             {
    //                 where : {
    //                     labId: req.body.receiverLabId,
    //                     productID : req.body.productId
    //                 }
    //             }
    //         ).then((resultReceiver)=>
    //         {   console.log(resultReceiver);
    //             if(resultReceiver == undefined)
    //             {   console.log('Receiver Row Does not Exist - ')
    //                 //Empty insert the row
    //                 IssuedDatabase.IssuedLab.create(
    //                     {   qty: req.body.transferQty,
    //                         labId : req.body.receiverLabId,
    //                         productId: req.body.productId
    //                     }
    //                 ).then((result)=>   {
    //
    //                     console.log('New Row created and Transfered Successfully')
    //                     res.send({message:"Transfer Successful",transfer:true})
    //                 })
    //
    //
    //             }
    //             else
    //             {   console.log('Receiver Row Exist ')
    //                 let rem_qty = resultReceiver.qty + req.body.transferQty
    //                 IssuedDatabase.IssuedLab.update({
    //                   //runate value error
    //                     qty: sequelize.literal(`qty + ${req.body.transferQty}`)
    //                     }
    //                 ,{
    //                     where: {
    //                         labId: req.body.receiverLabId,
    //                         productID : req.body.productId
    //                     }
    //                 }).then((result_end)=> {   console.log('Updated the Row - ')
    //
    //                 //    Sending the Result- message
    //                     res.send({message:"transfer successfull",transfer:true})
    //                 })
    //             }
    //         }).catch((err1)=>{
    //             console.log('Error '+err1)
    //             res.send({message:"Transfer failed",transfer:false})
    //         })
    //
    //
    //
    //
    //
    //     }).catch((err)=> {
    //         console.error("Result cannot be updated in Sender Lab - "+err)})
    //         res.status(404).send({message:"Cannot update Sender Lab",transfer:false})
    // }).catch((err2)=>{
    //     res.status(404).send({message:"Cannot Find Sender Lab",transfer:false})
    //
    //     console.error("Error in finding Sender Lap - "+err2)
    // })



})


exports = module.exports = {
    route
}