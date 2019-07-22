const route = require('express').Router()
const IssuedDatabase = require('../../database/model_issue').model
const DeptorLabs = require('../../database/models').model
const ProductModel = require('../../database/models2').model
const sequelize = require('sequelize')

route.get('/',(req,res)=>{
//    Show all the items which are issued and available to be returned-
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

function check_Product(productId,cb)
{
    ProductModel.Product.update({
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
    if(req.body.category==='lab')
    {
        IssuedDatabase.IssuedLab.update({
            qty: sequelize.literal(`qty - ${req.body.qty}`)
        },{
            where:{
                productId:req.body.productId,
                labId:req.body.labId
            }
        }).then(()=>{
            IssuedDatabase.IssuedLab.destroy({
                where: {
                    qty: 0,
                    productId:req.body.productId,
                    labId:req.body.labId
                }
            }).then(()=>{
                //Check for product
                check_Product(req.body.productId,()=>{
                    console.log('Item Returned To store - LAB ')
                    res.send({message:"Item Successfully Returned LABS",itemReturned:true})
                })
            }).catch((err3)=>console.error('Error In destroying -  '+err3))
        }).catch((err_up)=>console.error('Error In Update - '+err_up))
    }
    else if(category==='faculty')
    {
        IssuedDatabase.IssueFaculty.update({
            qty: sequelize.literal(`qty - ${req.body.qty}`)
        },{
            where:{
                productId:req.body.productId,
                facultyId:req.body.facultyId
            }
        }).then(()=>{
            IssuedDatabase.IssueFaculty.destroy({
                where: {
                    qty: 0,
                    productId:req.body.productId,
                    facultyId:req.body.facultyId
                }
            }).then(()=>{
                //Check for product
                check_Product(req.body.productId,()=>{
                    console.log('Item Returned To store - FACULTY')
                    res.send({message:"Item Successfully Returned - FACULTY",itemReturned:true})
                })
            }).catch((err3)=>console.error('Error In destroying -  '+err3))
        }).catch((err_up)=>console.error('Error In Update - '+err_up))
    }
})

exports.route = route