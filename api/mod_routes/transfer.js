const route = require('express').Router()
const IssuedDatabase = require('../../database/model_issue').model
const DeptorLabs = require('../../database/models').model

route.get('/',(req,res)=>{
//    Show all the items which are issued to be transfered -
    let issuedItems = {
        labs:null,
        department:null
    }
    IssuedDatabase.IssuedLab.findAll({

    }).then((resultLabs)=>{
    //    Getting all the labs which are issued computers -
        IssuedDatabase.IssuedDepartment.findAll(
            {
                include: [{
                    model: DeptorLabs.Depart || DeptorLabs.Labs
                }]
            }
        )
            .then((resultDept)=>{
                if(resultLabs[0]!==undefined)
                {
                    issuedItems.labs = resultLabs
                }
                if(resultDept[0]!==undefined)
                {
                    issuedItems.department = resultDept
                }
                res.send(issuedItems)
            })
            .catch((err)=>{console.log("err in Department"); console.error(err)})
    }).catch((err2)=>{ console.log("err in labs"); console.error(err2)})
})


exports = module.exports = {
    route
}