const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand_Manager = sequelize.define('Brand', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    business_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    terms_agreed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verification_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    lock_until: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'brand_manager',
    timestamps: false,
    underscored: true
});

module.exports = Brand_Manager;
