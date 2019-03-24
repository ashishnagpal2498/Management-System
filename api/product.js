const route = require('express').Router();
//Database -
const Vendor = require('../database/models2').model.Vendor;
const Product = require('../database/models2').model.Product;

route.get('/',(req,res)=>{
    Product.findAll({

    }).then((products)=> res.send(products))
        .catch((err)=> console.error(err))
})

route.post('/',(req,res)=>{
    Product.create({
        qty: req.body.qty,
        invoice_date:   req.body.invoice_date,
        invoice_no:req.body.invoice_no,
        warranty_year: req.body.warranty_year,
        product_details: req.body.product_details,
        approval: req.body.approval
    })
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=> console.error(err));
})




exports.route = route;