const route = require('express').Router();
//Database -
const Vendor = require('../database/models2').model.Vendor;
//const Product = require('../database/models2').model.Product;

route.get('/',(req,res)=>{
    Vendor.findAll({

    }).then((vendors)=> res.send(vendors))
        .catch((err)=> console.error(err))
})

route.get('/:id',(req,res)=>{
    Vendor.findOne({
        where: {id:req.params.id}
    }).then((result)=> res.send(result))
        .catch((err)=>{console.error('Error In finding - VEndor '+err)})
})

route.post('/',(req,res)=>{
    Vendor.create({
        vdorid:req.body.vendorId,
        name:req.body.name,
        accountNo:req.body.accountNo,
        companyname: req.body.companyname,
        companycontact:req.body.companycontact,
        personalcontact:req.body.personalcontact,
        companyemail: req.body.companyemail,
        address:[req.body.Vaddress,req.body.postal,req.body.state,req.body.country]
    })
        .then((result)=> {
            console.log(result)
            //  res.send({message:"vendor has been added"})
        res.send({added:true})
        }).catch((err)=> console.error(err))
})

exports.route= route;