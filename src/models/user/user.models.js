const db = require("../../config/database");
const { DataTypes } = require("sequelize");

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

module.exports = User;