const route = require('express').Router();
//Database -
// const Vendor = require('../database/models2').model.Vendor;
const Product = require('../database/models2').model.Product;
const {Op} = require('sequelize')
route.get('/',(req,res)=>{
    Product.findAll({

    }).then((products)=> res.send(products))
        .catch((err)=> console.error(err))
})
route.get('/:id',(req,res)=>{
    Product.findOne({
        where:{
            id: req.params.id
        }
    }).then((result)=> res.send(result))
        .catch((err)=> console.error(err))
})


route.post('/',(req,res)=>{
    Product.create({
        pOrderNo:req.body.pOrderNo,
        name:req.body.name,
        category:req.body.category,
        qty: req.body.qty,
        manufacturer:req.body.manufacturer,
        modelName:req.body.modelName,
        invoice_date:   req.body.invoice_date,
        invoice_no:req.body.invoice_no,
        warranty_year: req.body.warranty_year,
        product_details: req.body.product_details,
        price: req.body.price,

        //Vendor Id
        vendorId:req.body.vendorId

    })
        .then((result)=>{
            console.log(result)
            res.redirect('.')
        })
        .catch((err)=> console.error(err));
})

route.post('/filter',(req,res)=>{
    let category = req.body.category || "";
    let date_ = req.body.date || "";
    console.log(category)
    console.log(date_);
    console.log(typeof category)
    console.log(typeof date_)
    Product.findAll({
        where:
            {
                [Op.or]:{
                    category : {
                        [Op.or] : category
                    }
                    ,
                    invoice_date: {
                        [Op.like]: {[Op.any]: date_}
                    }
                    // invoice_date : {
                    //     [Op.startsWith] : [{
                    //         [Op.or] : date_
                    //     }]
                }
                // name: {
                //     [Op.or] : category
                // }

             // invoice_date : {
             //     [Op.startsWith] : [{
             //         [Op.or] : date
             //     }]
             //     // [Op.or]: [{
             //     //     [Op.startsWith]: date
             //     //     //     [{
             //     //     // [Op.or] :    date
             //     //     // }]
             //     // }]
             //
             //     //[Op.startsWith] :{[Op.or]: date]}
             // }
            }
    }).then((results)=>{
        console.log(results)
        res.send(results)
    }).catch((err)=>{console.error('ERROR IN FILTER '+err)})
})



exports.route = route;

/*
Values

qty:20
invoice_no:547294529
warranty_year:3
product_details:It is a good prudct.
approval:Sourabh

 */