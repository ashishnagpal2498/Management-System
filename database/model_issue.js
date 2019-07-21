const Sequelize = require('sequelize')
const dbconfig = require('../databaseconfig').DB

const databaseModel1 = require('./models').model;
const databaseModel2 = require('./models2').model


//Datatypes -
const dataTypes = Sequelize.DataTypes

const mgmtSystem = new Sequelize(dbconfig.database,
    dbconfig.user,
    dbconfig.password,
    {   host:dbconfig.host,
        dialect:dbconfig.dialect
    }
)

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


IssueFaculty.belongsTo(databaseModel1.Faculty,{
    foreignKeyConstraint:null
})
databaseModel1.Faculty.hasOne(IssueFaculty);

IssuedLab.belongsTo(databaseModel1.Labs,{
    foreignKeyConstraint:null
})
databaseModel1.Labs.hasOne(IssuedLab)

IssuedLab.belongsTo(databaseModel2.Product,
    {
        foreignKeyConstraint:null
    })
databaseModel2.Product.hasMany(IssuedLab)

IssueFaculty.belongsTo(databaseModel2.Product,
    {
        foreignKeyConstraint:null
    })
databaseModel2.Product.hasMany(IssueFaculty)


mgmtSystem.sync({alter:true,}).then(() => console.log('Issue Model'))
.catch((err)=>console.error('issue model'+err))

exports.model={
    IssueFaculty, IssuedLab
}