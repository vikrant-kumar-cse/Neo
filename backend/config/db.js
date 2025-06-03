/*const mysql=require('mysql2/promise')

const mysqlpool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Vikrant@541",
    database:"authetication_db"
})


module.exports=mysqlpool;
*/


const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
});


sequelize.authenticate()
    .then(() => console.log('Database Connected...'))
    .catch(err => console.error('Database Connection Failed:', err.message));

module.exports = sequelize;
