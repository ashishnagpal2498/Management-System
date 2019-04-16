const route = require('express').Router();
//Database -
const Vendor = require('../database/models2').Vendor;
const Product = require('../database/models2').Product;

route.get('/',(req,res)=>{
    Vendor.findAll({

    }).then((vendors)=> res.send(vendors))
        .catch((err)=> console.error(err))
})

route.post('/',(req,res)=>{
    Vendor.create({
        vdorid:req.body.vendorid,
        name:req.body.name,
        accountNo:req.body.accountNo,
        companyname: req.body.companyname,
        companycontact:req.body.companycontact,
        personalcontact:req.body.personalcontact,
        companyemail: req.body.companyemail,
        address:[req.body.add,req.body.postal,req.body.state,req.body.country]
    })
        .then((result)=> {
            console.log(result)
            //  res.send({message:"vendor has been added"})
        res.redirect('.')
        }).catch((err)=> console.error(err))
})

exports.route= route;