const route = require('express').Router()
// const Database = require('../../database/model_issue').model
// const Database = require('../../database/models').model
// const Database = require('../../database/models2').model
const Database = require('../../database/model_index')
const sequelize = require('sequelize')

route.get('/',(req,res)=>{
//    Show all the items which are issued and available to be returned-
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

function check_Product(productId,cb)
{
    Database.Product.update({
        issued: false
    },{
        where:{
            id: productId
        }
    }).then(()=>{
        console.log('Product unissued Successfully - ')
        cb();
    }).catch((err)=>{
        console.error('Error in Making Product - Unissued')
    })
}

route.post('/',(req,res)=>{
    // Issued Item - qty decrease
    //Check if the qty becomes 0 then - delete that
    //Product - issued - True - false -
    console.log(req.body)
    if(req.body.category==='lab')
    {
        Database.IssuedLab.update({
            qty: sequelize.literal(`qty - ${req.body.qty}`)
        },{
            where:{
                productId:req.body.productId,
                labId:req.body.labId
            }
        }).then(()=>{
            Database.IssuedLab.destroy({
                where: {
                    qty: 0,
                    productId:req.body.productId,
                    labId:req.body.labId
                }
            }).then(()=>{
                //Check for product
                check_Product(req.body.productId,()=>{
                    console.log('Item Returned To store - LAB ')
                    res.send({message:"Item Successfully Returned from LAB to store",itemReturned:true})
                })
            }).catch((err3)=>console.error('Error In destroying -  '+err3))
        }).catch((err_up)=>console.error('Error In Update - '+err_up))
    }
    else if(req.body.category==='faculty')
    {
        Database.IssueFaculty.update({
            qty: sequelize.literal(`qty - ${req.body.qty}`)
        },{
            where:{
                productId:req.body.productId,
                facultyId:req.body.facultyId
            }
        }).then(()=>{
            Database.IssueFaculty.destroy({
                where: {
                    qty: 0,
                    productId:req.body.productId,
                    facultyId:req.body.facultyId
                }
            }).then(()=>{
                //Check for product
                check_Product(req.body.productId,()=>{
                    console.log('Item Returned To store - FACULTY')
                    res.send({message:"Item Successfully Returned from FACULTY to store",itemReturned:true})
                })
            }).catch((err3)=>console.error('Error In destroying -  '+err3))
        }).catch((err_up)=>console.error('Error In Update - '+err_up))
    }
})

exports.route = route