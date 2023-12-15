//config database menggunakan orm sequelize

const { Sequelize } = require("sequelize");
require("dotenv").config();
const DATABASE = process.env.DB_NAME
const USERNAME = process.env.DB_USER
const PASSWORD = ''
const HOST = process.env.DB_HOST

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    port: '3306',
    pool: {
        max: 100,
        min: 0,
        acquire: 1000000,
        idle: 1000000
    }
});

module.exports = db;