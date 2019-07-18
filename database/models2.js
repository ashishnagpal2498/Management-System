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
        id:{
            type: dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        vdorid:{
          type:dataTypes.INTEGER
        },
        accountNo : dataTypes.STRING,
        name: dataTypes.STRING,

        companyname:{
            type: dataTypes.STRING
        },
        companycontact:{
            type : dataTypes.STRING,
            allowNull:false
        },
        personalcontact:{
            type:dataTypes.STRING
        },
        companyemail: dataTypes.STRING,
        address:{
            type:dataTypes.STRING,
            get(){
               return this.getDataValue('address').split(';')
            },
            set(add)
            {
                this.setDataValue('address',add.join(';'))
            }
        }
    }
)


const Product = mgmtSystem.define(
    'product',
    {
        id:{
            type : dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        pOrderNo:dataTypes.INTEGER,
        name: dataTypes.STRING,
        qty: dataTypes.INTEGER,
        manufacturer: dataTypes.STRING,
        modelName: dataTypes.STRING,
        invoice_date: dataTypes.DATE,
        invoice_no: dataTypes.INTEGER,
        warranty_year: dataTypes.INTEGER,
        product_details: dataTypes.STRING,
        price: dataTypes.INTEGER,
        issued :{
            type: dataTypes.BOOLEAN,
            defaultValue: false
        }
    }
)




Product.belongsTo(Vendor,{
    foreignKeyConstraint: 'none'
});
Vendor.hasMany(Product)


// mgmtSystem
//     .sequelize
//     .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
//     .then(function(results) {
//         mgmtSystem.sequelize.sync({force: true});
//     }).catch();

mgmtSystem.sync({alter:true})
    .then(()=>{
        console.log('Vendor and Product')
    })
    .catch((err)=> console.error('model error Product  '+err))

exports.model= {
    Product,Vendor
}