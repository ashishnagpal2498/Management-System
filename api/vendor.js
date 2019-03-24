const route = require('express').Router();
//Database -
const Vendor = require('../database/models2').model.Vendor;
const Product = require('../database/models2').model.Product;

route.get('/',(req,res)=>{
    Vendor.findAll({

    }).then((vendors)=> res.send(vendors))
        .catch((err)=> console.error(err))
})

route.post('/',(req,res)=>{
    Vendor.create({
        comapnyname: req.body.companyname,
        companycontact:req.body.companycontact,
        personalcontact:req.body.personalcontact,
        companyemail: req.body.companyemail
    })
        .then((result)=>{ console.log(result)
          //  res.send({message:"vendor has been added"})
           res.send(`
           <html lang="en">
            <head>
            <title>
       <script>
       function reloadpage()
       { setTimeout(()=>{
           window.location = './vendor_form.html'
       },5000)
       }
</script>     
</title>
</head>
<body onload="reloadpage()">
     <h3 align="center" id="message">Vendor was successfully added</h3>
    <p style="color: red">You will be redirected in <span id="number-spane"></span></p>
</body>
</html>`)
        })
        .catch((err)=> console.error(err))
})

exports.route= route;