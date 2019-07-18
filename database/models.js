const Sequelize = require('sequelize')
//For using datatypes -
const dataTypes = Sequelize.DataTypes;
//Require the configrtion file
const dbconfig = require('../databaseconfig').DB


//Creation of database -
const mgmtSystem = new Sequelize(dbconfig.database,
        dbconfig.user,
        dbconfig.password,
        {   host:dbconfig.host,
           dialect:dbconfig.dialect
        }
        )
//Tables - Using class object-
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

const Labs = mgmtSystem.define(
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



Labs.belongsTo(Depart);
Depart.hasMany(Labs);

//sync the database
mgmtSystem.sync({alter:true}).then(()=> console.log('Database Configured'))
    .catch((err)=> console.error('labs and depart'+err))

exports.model= {
    Depart , Labs , Faculty
}