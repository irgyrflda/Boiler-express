const db = require("../../config/database"); //import connection database
const { DataTypes } = require("sequelize");
//menggunakan ORM express.js
const User = db.define(
    "User",
    {
        id_user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    },
    {
        timestamps: false,
        tableName: 'ref_user',
    }
)

module.exports = User; //exports module user
//module ini di import di ./src/models/user/index.js