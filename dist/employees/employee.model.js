"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
function default_1(sequelize) {
    Employee.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        departmentId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
        timestamps: true,
    });
    return Employee;
}
