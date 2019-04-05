const express = require('express')
const route = express.Router();
const databaseProduct = require('../../database/models2').model
const IssueDatabase = require('../../database/model_issue').model

route.get('/',(req,res)=>{
//    Show all the Products which are not issued yet -
        databaseProduct.Product.findAll({
            where:{
                issued:false
            }
        }).then((results)=>{
        //    We will get all the Products whose issued value is false -
            //
            res.send(results);
        }).catch((err)=> console.error(err))
})

//The post request used to find the Remaining quantity of the Product - Selected -'
route.post('/:id',(req,res)=>{
    //Need to return the product Details and the remaining quantity of the Product
    IssueDatabase.IssuedLab.findAll({
        where: {
            productPid : req.params.id
        }
    }).then((results)=>{
        IssueDatabase.IssuedDepartment.findAll({
            where:{
               productPid: req.params.id
            },
            include: [Product]
        }).then((results2)=>{
            //Both the results are Configured - Return the remaining Quanty of the product
            let remaining_quantity = Product.qty - results2.qty - results.qty
            res.send({remaining_qty:remaining_quantity})

        }).catch((err)=>{
            console.log('Error in Finding Product Issued in Department')
            console.error(err)
        }).catch((err)=>{
            console.log('Error in Finding Product Issued in Lab')
            console.error(err)
        })
    })
})

//Post Request , Then issue the Product To lab or Department -
route.post('/',(req,res)=>{
    //Check if the field is NULL-
    if(req.body.department)
    {
        IssueDatabase.IssuedDepartment.create({
            qty: req.body.qty,
            productPid: req.body.id
        }).then(()=>{
            console.log('Product Issued in Department Successfully with qty - '+ req.body.qty)
            res.redirect('.')
        }).catch((err)=>{
            console.log('Product cannot be issued In Department');
            console.error(err);
        })
    }
    else if(req.body.lab)
    {
        IssueDatabase.IssuedLab.create({
            qty: req.body.qty,
            productPid: req.body.id
        }).then(()=>{
            console.log('Product Issued in LAB  Successfully with qty - '+ req.body.qty)
            res.redirect('.')
        }).catch((err)=>{
            console.log('Product cannot be issued In Lab ');
            console.error(err);
        })
    }
})


exports = module.exports = {
    route
}