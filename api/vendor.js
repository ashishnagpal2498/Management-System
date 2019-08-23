const route = require('express').Router();
//Database -
const Database_Vendor = require('../database/model_index').Vendor;

route.get('/',(req,res)=>{
    Database_Vendor.findAll({

    }).then((vendors)=> res.send(vendors))
        .catch((err)=> console.error(err))
})

route.get('/:id',(req,res)=>{
    Database_Vendor.findOne({
        where: {id:req.params.id}
    }).then((result)=> res.send(result))
        .catch((err)=>{console.error('Error In finding - VEndor '+err)})
})

route.post('/',(req,res)=>{
    Database_Vendor.create({
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