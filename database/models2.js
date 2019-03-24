const Sequelize = require('sequelize')
const dbconfig = require('../databaseconfig').DB

//Datatypes -
const dataTypes = Sequelize.DataTypes

const mgmtSystem = new Sequelize(dbconfig.database,
    dbconfig.user,
    dbconfig.password,
    {   host:dbconfig.host,
        dialect:dbconfig.dialect
    }
)
const Vendor = mgmtSystem.define(
    'vendor',
    {
        vid:{
            type: dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        comapnyname:{
            type: dataTypes.STRING
        },
        companycontact:{
            type : dataTypes.INTEGER,
            allowNull:false
        },
        personalcontact:{
            type:dataTypes.INTEGER
        }
    }
)

const Product = mgmtSystem.define(
    'product',
    {
        pid:{
            type : dataTypes.NUMBER,
            autoIncrement:true,
            primaryKey:true
        },
        invoice_date: dataTypes.DATE,
        invoice_no: dataTypes.NUMBER,
        warranty_year: dataTypes.NUMBER,
        product_details: dataTypes.STRING,
        approval: dataTypes.STRING
    }
)

mgmtSystem.sync({force:true})
    .then(()=>{
        console.log('Vendor and Product')
    })
    .catch((err)=> console.error(err))