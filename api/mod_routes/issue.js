const express = require('express')
const route = express.Router();
const databaseProduct = require('../../database/models2');
const IssueDatabase = require('../../database/model_issue');


route.get('/',(req,res)=>{
//    Show all the Products which are not issued yet -
        databaseProduct.Product.findAll({
            where: {
                issued:false
            }
        }).then((results)=>{
        //    We will get all the Products whose issued value is false -
            //
            res.send(results);
        }).catch((err)=> console.error(err))
})

//The post request used to find the Remaining quantity of the Product - Selected -'
route.get('/:id',(req,res)=>{
    //Need to return the product Details and the remaining quantity of the Product
    IssueDatabase.IssuedLab.findOne({
        where: {
            productPid : req.params.id
        },
        include: [{
            model: databaseProduct.Product
        }]
    }).then((result)=>{
        console.log(result.product)
        IssueDatabase.IssuedDepartment.findOne({
            where:{
               productPid: req.params.id
            },
        }).then((result2)=>{
            //Both the results are Configured - Return the remaining Quanty of the product
            console.log('Results Of 1st Query - ')
            console.log(result2)
            let remaining_quantity = result.product.qty - result2.qty - result.qty
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
        //    Addition of Foreign Key
            departmentDno:req.body.departmentDno,
            productPid: req.body.productPid
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
            // productPid: req.body.id,

            //Foreign key Attributes
            labLabid:req.body.labLabid,
            productPid: req.body.productPid

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

/*

Issue Department;
qty:8
productPid:1
department:Cse
departmentDno:1



Issue Labs
qty:8
productPid:1
lab:Cse
labsLabid:1


 */