const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VerificationCode = sequelize.define('VerificationCode', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'verification_codes',
    timestamps: false
});

module.exports = VerificationCode;
