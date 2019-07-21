const express = require('express')
const route = express.Router();
const databaseProduct = require('../../database/models2').model;
const IssueDatabase = require('../../database/model_issue').model;
const DatabaseLabs = require('../../database/models').model;
const sequelize = require('sequelize')

route.get('/',(req,res)=>{
//    Show all the Products listed -
    //Changes - hERE
    // IssueDatabase.IssuedLab.ffaculty
    //     .then((result)=>{
    //         IssueDatabase.IssueFaculty.findAll((result2)=>{
    //             res.send(result+result2)
    //         }).catch((err)=>{console.error('Error in finding Issue depts'+err)})
    //     }).catch((err2)=> console.error('Error in finding Issue Labs'+err2))
    //    Issue Basically shows all the list of products and Previously Issued
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
    // databaseProduct.Product.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // }).then((result)=>{
    //
    // })
    IssueDatabase.IssuedLab.findAll({
        where: {
            productId : req.params.id
        },
        include: [{
            model: databaseProduct.Product
        },{model: DatabaseLabs.Labs}]
    }).then((result)=>{
        //console.log(result.product)
        //If the result is empty then - there is no issued in lab previously -

        IssueDatabase.IssueFaculty.findAll({
            where:{
               productId: req.params.id
            },
            include:[{
                model:databaseProduct.Product
            },{model:DatabaseLabs.Faculty}]
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
                    let issuedQty = 0;
                    for(let i=0;i<result2.length;i++)
                    {
                        issuedQty+=result2[i].qty;
                    }
                 remaining_quantity = result2[0].product.qty- issuedQty;
                res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})

            }
            else if(result2[0]===undefined)
            {   console.log('Inside elseif 2')
                issuedItem.labs = result
                issuedItem.product = result[0].product

                let issuedQty = 0;
                //Issued Qty to Labs
                for(let i=0;i<result.length;i++)
                {
                    issuedQty+=result[i].qty;
                }
                remaining_quantity = result[0].product.qty - issuedQty;
                res.send({remaining_qty:remaining_quantity,notfound:false,issuedItem})
            }
            else {
                console.log('Inside else part of Req ')
                issuedItem.product = result[0].product
                issuedItem.labs = result
                issuedItem.department = result2
                let issuedQty = 0;
                for(let i=0;i<result.length;i++)
                {
                    issuedQty+=result[i].qty;
                }
                //Issued Qty to Department
                for(let i=0;i<result2.length;i++)
                {
                    issuedQty+=result2[i].qty;
                }
                remaining_quantity = result[0].product.qty - 0 - issuedQty //also subtract Result product -
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

function updateProduct(id,cb)
{
    databaseProduct.Product.update({
        issued : true},
        {
        where:{
            id:id
        }
    }).then((result)=> { console.log('Product with  '+id+' Issued Successfully') ; cb();})
        .catch((err) => console.error(err))
}
function checkProduct(actual_rem_qty,productId,cPcb)
{
    if(actual_rem_qty ===0) {
    console.log('QUANTITY FULL ------------------->>>>')
        updateProduct(productId, () => {
            cPcb();
        })
    }
    else{
        console.log('Else part of rem Quantity')
        cPcb();
        //res.redirect('.')
    }

}
//Post Request , Then issue the Product To lab or Department -
route.post('/',(req,res)=>{
    //Check if the field is NULL-
    let actual_rem_qty = +(req.body.remaining_qty) - +(req.body.qty);
    // console.log("ACTUAL REMAINING QUANTITY -----")
    console.log(actual_rem_qty);
    if(req.body.category==='faculty')
    {
        //1st check that if the Product is previously issued to the Faculty or not -
        IssueDatabase.IssueFaculty.findOne({
            where: {
                facultyId:req.body.facultyId,
                productId: req.body.productId
            }
        }).then((result)=>{
            //If the Result is Found that means - The Faculty already has the existing product
            if(result == undefined)
            {
                //Create
                IssueDatabase.IssueFaculty.create({
                    qty: req.body.qty,
                    //    Addition of Foreign Key
                    facultyId:req.body.facultyId,
                    productId: req.body.productId
                }).then(()=>{
                    console.log('Product Issued to Faculty Successfully AND NEW ROW CREATED with qty - '+ req.body.qty)
                    //Check - if the Product rem quantity goes to Zero - set the value of
                    //issued in product to 1

                   checkProduct(actual_rem_qty,req.body.productId,()=>{
                       res.redirect('.')
                    })
                }).catch((err)=>{
                    console.log('Product cannot be issued TO FACULTY NEW ROW');
                    console.error(err);
                })
            }
            else
            {
                IssueDatabase.IssueFaculty.update({
                    qty: sequelize.literal(`qty + ${req.body.qty}`)
                    //    Addition of Foreign Key
                },{
                   where: {
                       facultyId: req.body.facultyId,
                       productId: req.body.productId
                   }
                }).then(()=>{
                    console.log('Product Issued to Faculty Successfully AND PREVIOUS ROW CREATED with qty - '+ req.body.qty)
                    //Check - if the Product rem quantity goes to Zero - set the value of
                    //issued in product to 1

                    checkProduct(actual_rem_qty,req.body.productId,()=>{
                        res.redirect('.')
                    })

                }).catch((err)=>{
                    console.log('Product cannot be issued TO FACULTY PREVIOUS ROW');
                    console.error(err);
                })
            }
        }).catch((err4)=> console.error('Error In finding - Issue Faculty'+err4))
    }
    else if(req.body.category==='lab')
    {
        IssueDatabase.IssuedLab.findOne({
            where:{
                labId:req.body.labId,
                productId: req.body.productId
            }
        }).then((result)=>{

            if(result == undefined)
            {
                IssueDatabase.IssuedLab.create({
                    qty: req.body.qty,
                    // productPid: req.body.id,
                    labId:req.body.labId,
                    productId: req.body.productId
                }).then(()=>{
                    console.log('Product Issued in LAB NEW ROW Successfully with qty - '+ req.body.qty)

                    checkProduct(actual_rem_qty,req.body.productId,()=>{
                        res.redirect('.')
                    })

                }).catch((err)=>{
                    console.log('Product cannot be issued In Lab ');
                    console.error(err);
                })

            }
            else
            {
                IssueDatabase.IssuedLab.update({
                    qty: sequelize.literal(`qty + ${req.body.qty}`),
                    // productPid: req.body.id,

                },{
                    where: {
                        labId:req.body.labId,
                        productId: req.body.productId
                    }
                }).then(()=>{
                    console.log('Product Issued in PREVIOUS  LAB  Successfully with qty - '+ req.body.qty)

                    checkProduct(actual_rem_qty,req.body.productId,()=>{
                        res.redirect('.')
                    })

                }).catch((err)=>{
                    console.log('Product cannot be issued In Lab ');
                    console.error(err);
                })


            }
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
//         IssueDatabase.IssueFaculty.findAll({
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