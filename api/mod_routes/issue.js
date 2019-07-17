const express = require('express')
const route = express.Router();
const databaseProduct = require('../../database/models2').model;
const IssueDatabase = require('../../database/model_issue').model;


route.get('/',(req,res)=>{
//    Show all the Products listed -

        databaseProduct.Product.findAll({
            where: {

            }
        }).then((results)=>{
        //    We will get all the Products whose issued value is false -
            //
            res.send(results);
        }).catch((err)=> console.error(err))
})

route.get('/unissued',(req,res)=>{
    //    Show all the Products which are not issued yet -
    databaseProduct.Product.findAll({
        where: {
            issued: false
        }
    }).then((results)=>{
        //    We will get all the Products whose issued value is false -
        //
       return res.send(results);
    }).catch((err)=> console.error(err))
})



//The post request used to find the Remaining quantity of the Product - Selected -'
route.get('/:id',(req,res)=>{
    //Need to return the product Details and the remaining quantity of the Product
    IssueDatabase.IssuedLab.findAll({
        where: {
            labId : req.params.id
        },
        include: [{
            model: databaseProduct.Product
        }]
    }).then((result)=>{
        //console.log(result.product)
        //If the result is empty then - there is no issued in lab previously -

        IssueDatabase.IssuedDepartment.findAll({
            where:{
               productId: req.params.id
            },
            include:[{
                model:databaseProduct.Product
            }]
        }).then((result2)=>{
            //Both the results are Configured - Return the remaining Quanty of the product
            console.log('Results Of 1st Query - ')
            console.log(result)
            console.log('Result Of 2nd Query')
            console.log(result2)
            //If the result2 are undefined

            let issuedItem = {
                labs : null,
                department: null,
                  product: null
            }
            let remaining_quantity;
            // if((result===undefined||result===[])&&(result2===undefined||result2===[]))
            // {
            //     //Both are empty -
            //     res.send({message:"nothing issued before",notfound:true})
            // }
            console.log('before IF')
            console.log(result[0])
            console.log(result2[0])
            if(result[0]===undefined&&result2[0]===undefined)
            {
                //Here see that [] ka product nhi aayega - so -
                //send that product only -
                databaseProduct.Product.findOne({
                    where:{
                        id: req.params.id
                    }
                }).then((product_result)=>{
                    //result
                    issuedItem.product= product_result;
                    remaining_quantity = product_result.qty
                    res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})
                }).catch((err)=> {
                    console.error(err);
                })
            }


        else if(result[0]===undefined)
            {   console.log('Inside elseif 1')
                //result 2 exits - That means Product is issued to Department Before -
                    issuedItem.department = result2;
                    issuedItem.product = result2[0].product
                 remaining_quantity = result2[0].product.qty- result2[0].qty;
                res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})

            }
            else if(result2[0]===undefined)
            {   console.log('Inside elseif 1')
                issuedItem.labs = result
                issuedItem.product = result[0].product
                remaining_quantity = result[0].product.qty - result[0].qty;
                res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})
            }
            else {

                issuedItem.product = result[0].product
                issuedItem.labs = result
                issuedItem.department = result2
              remaining_quantity = result[0].product.qty - 0 - result[0].qty - result2[0].qty //also subtract Result product -
                res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})
            }


        }).catch((err)=>{
            console.log('Error in Finding Product Issued in Department')
            console.error(err)
        }).catch((err)=>{
            console.log('Error in Finding Product Issued in Lab')
            console.error(err)
        })
    })
})

function updateProduct(id,remaining_qty,cb)
{
    databaseProduct.Product.update({
        issued : true,
        where:{
            id:id
        }
    }).then((result)=> { cb(); console.log('Product with  '+id+' Issued Successfully')})
        .catch((err) => console.error(err))
}
//Post Request , Then issue the Product To lab or Department -
route.post('/',(req,res)=>{
    //Check if the field is NULL-
    if(req.body.category==='department')
    {
        IssueDatabase.IssuedDepartment.create({
            qty: req.body.qty,
        //    Addition of Foreign Key
            departmentId:req.body.departmentDno,
            productId: req.body.productId
        }).then(()=>{
            console.log('Product Issued in Department Successfully with qty - '+ req.body.qty)
            //Check - if the Product rem quantity goes to Zero - set the value of
            //issued in product to 1
            if(req.body.remquantity===0)
            updateProduct(req.body.productId,req.body.remquantity,()=>{
                res.redirect('.')
            })
            else{
                res.redirect('.')
            }

        }).catch((err)=>{
            console.log('Product cannot be issued In Department');
            console.error(err);
        })
    }
    else if(req.body.category==='lab')
    {
        IssueDatabase.IssuedLab.create({
            qty: req.body.qty,
            // productPid: req.body.id,

            //Foreign key Attributes
            labId:req.body.labId,
            productId: req.body.productId

        }).then(()=>{
            console.log('Product Issued in LAB  Successfully with qty - '+ req.body.qty)
            if(req.body.remquantity==0)
                updateProduct(req.body.productPid,req.body.remquantity,()=>{
                    res.redirect('.')
                })
            else{
                res.redirect('.')
            }

        }).catch((err)=>{
            console.log('Product cannot be issued In Lab ');
            console.error(err);
        })
    }
})
// route.post('/:id',(req,res)=>{
//     //Need to return the product Details and the all the labs and department
//     //To which this product is issued
//     IssueDatabase.IssuedLab.findAll({
//         where: {
//             productId : req.params.id
//         },
//         include: [{
//             model: databaseProduct.Product
//         }]
//     }).then((results)=>{
//         //console.log(results[0].product)
//         IssueDatabase.IssuedDepartment.findAll({
//             where:{
//                 productId: req.params.id
//             },
//         }).then((results2)=>{
//             //Both the results are Configured - Return the remaining Quanty of the product
//             console.log('Results Of 1st Query - ')
//             console.log(results2)
//             let issuedItem = {
//                 labs : results,
//                 department: results2,
//               //  product: results[0].product
//             }
//             res.send(issuedItem)
//
//         }).catch((err)=>{
//             console.log('Error in Finding Product Issued in Department')
//             console.error(err)
//         }).catch((err)=>{
//             console.log('Error in Finding Product Issued in Lab')
//             console.error(err)
//         })
//     })
// })


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