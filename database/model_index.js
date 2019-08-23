const Sequelize = require('sequelize')
const dataTypes = Sequelize.DataTypes;
const dbConfig = require('../config')


const mgmtSystem= new Sequelize(dbConfig.database_URI)

const Login_username = mgmtSystem.define ('username',
    {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey:true,
        },

        email:{
            type:dataTypes.STRING,
            allowNull:false
        },
        username:{
            type: dataTypes.STRING,
            allowNull:false
        },
        name:{
            type:dataTypes.STRING
        },
        designation:{
            type:dataTypes.STRING
        },
        department:{
            type: dataTypes.STRING
        }

    }
)
const Passwords = mgmtSystem.define('password',
    {
        id:{
            type:dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            //autoIncrement:true,
            primaryKey: true
        },
        password : dataTypes.STRING
    })


//Models2
//Product and Vendor
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
        category: dataTypes.STRING,
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

//models - DEPARTMENT FACULTY AND LABS

const Depart = mgmtSystem.define(
    'department',
    {
        id:{
            type:dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        dno: dataTypes.INTEGER,
        name:{
            type:dataTypes.STRING,
            allowNull:false
        },
        hod:{
            type:dataTypes.STRING
        },
        block:{
            type:dataTypes.STRING
        }
    },
    {
        tableName:'department'
    }
)

const Labs =  mgmtSystem.define(
    'labs',
    {
        id:{
            type: dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        labno:{
            type:dataTypes.INTEGER,
        },
        name:{
            type:dataTypes.STRING
        },
        technician:{
            type:dataTypes.STRING
        },
        block: dataTypes.STRING,

        floor: dataTypes.INTEGER
    }, {
        //tableName: 'lab'
    }
);

const Faculty = mgmtSystem.define(
    'faculty',
    {
        id:{
            type :dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        fid: dataTypes.STRING,
        name : dataTypes.STRING,
        designation: dataTypes.STRING,
        responsibility: dataTypes.STRING,
        block: dataTypes.STRING,
        floor: dataTypes.INTEGER
    }
)

//ISSUE
//Issue database - which will keep the record of which Product is issued to Whom or which LAB-
const IssueFaculty = mgmtSystem.define(
    'issue_faculty',
    {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        qty: dataTypes.INTEGER,


    })

const IssuedLab = mgmtSystem.define(
    'issue_lab',
    {
        id:{
            type:dataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        qty: dataTypes.INTEGER
    }
)


//END OF TABLE DEFINATIONS HERE



//RELATIONS -
//1
Passwords.belongsTo(Login_username,{
    foreignKeyConstraint:null
})
Login_username.hasOne(Passwords);

//2
Product.belongsTo(Vendor,{
    foreignKeyConstraint:null
});
Vendor.hasMany(Product)

//3
Labs.belongsTo(Depart,{
    foreignKeyConstraint:null
});
Depart.hasMany(Labs);

//4 ISSUE LAB RELATIONS

IssueFaculty.belongsTo(Faculty,{
    foreignKeyConstraint:null
})
Faculty.hasOne(IssueFaculty);

IssuedLab.belongsTo(Labs,{
    foreignKeyConstraint:null
})
Labs.hasOne(IssuedLab)

IssuedLab.belongsTo(Product,
    {
        foreignKeyConstraint:null
    })
Product.hasMany(IssuedLab)

IssueFaculty.belongsTo(Product,
    {
        foreignKeyConstraint:null
    })
Product.hasMany(IssueFaculty)



//END OF RELATIONS HERE

mgmtSystem.sync({alter:true}).then(()=>{
    console.log('Database Configured')
}).catch((err)=> console.error('ERROR IN DATABASE '+err))

module.exports = exports = {
   Login_username, Passwords , Vendor , Product , Depart , Labs , Faculty , IssuedLab , IssueFaculty
}