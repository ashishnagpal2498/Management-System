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
        },
        companyemail: dataTypes.STRING
    }
)

const Product = mgmtSystem.define(
    'product',
    {
        pid:{
            type : dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        qty: dataTypes.INTEGER,
        invoice_date: dataTypes.DATE,
        invoice_no: dataTypes.INTEGER,
        warranty_year: dataTypes.INTEGER,
        product_details: dataTypes.STRING,
        approval: dataTypes.STRING,
        issued :{
            type: dataTypes.BOOLEAN,
            defaultValue: false
        }
    }
)





Product.belongsTo(Vendor);
Vendor.hasMany(Product)




mgmtSystem.sync({alter:true})
    .then(()=>{
        console.log('Vendor and Product')
    })
    .catch((err)=> console.error(err))

exports.model = {
    Product,Vendor
}