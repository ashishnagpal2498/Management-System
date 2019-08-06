const PORT = process.env.PORT || 2121
const database_URI = process.env.DATABASE_URL || "mysql://managementAdmin:password@localhost:3306/msystem"

exports = module.exports = {
    PORT,
    database_URI
}