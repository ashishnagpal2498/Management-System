const route = require('express').Router()
const IssuedDatabase = require('../../database/model_issue').model
const DeptorLabs = require('../../database/models').model
const ProductModel = require('../../database/models2').model
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
route.get('/:id:deptOrlab',(req,res)=>{
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
    IssuedDatabase.IssuedLab.findOne({},
        {
            where : {
                labId: req.body.senderLabId,
                productId : req.body.productId
            }
        }
    ).then((result1)=>{
        console.log(result1.qty)
        let rem_qty = result1.qty -  req.body.transferQty;
        IssuedDatabase.IssuedLab.update({
            qty: rem_qty
            },
        {
            where:{
                labId: req.body.senderLabId,
                    productId : req.body.productId
            }
        //Adding 1 more lab and the check -
        }).then((result_update)=>{
            console.log('Result has been updated in Sender Lab')
            
        //    Lab 2 selected mein quantity increase or create the row 
            IssuedDatabase.IssuedLab.findOne({},
                {
                    where : {
                        labId: req.body.receiverLabId,
                        productID : req.body.productId
                    }
                }
            ).then((resultReceiver)=>{
                if(resultReceiver[0]===undefined)
                {
                    //Empty insert the row 
                    IssuedDatabase.IssuedLab.create(
                        {   qty: req.body.transferQty,
                            labId : req.body.receiverLabId,
                            productId: req.body.productId
                        }
                    ).then((result)=> console.log('New Row created and Transfered Successfully'))
                }
                else
                {
                    let rem_qty = resultReceiver.qty + req.body.transferQty
                    IssuedDatabase.IssuedLab.update({
                      //runate value error
                        qty: rem_qty
                        }
                    ,{
                        where: {
                            labId: req.body.receiverLabId,
                            productID : req.body.productId
                        }
                    }).then((res)=> console.log('Updated the Row - '))
                }
            })
            
            
            
            
            
        }).catch((err)=> console.error("Result cannot be updated in Sender Lab - "+err))
    }).catch((err2)=>{
        console.error("Error in finding Sender Lap - "+err2)
    })



})


exports = module.exports = {
    route
}