"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkRequest = void 0;
exports.default = default_1;
const sequelize_1 = require("sequelize");
class WorkRequest extends sequelize_1.Model {
}
exports.WorkRequest = WorkRequest;
function default_1(sequelize) {
    WorkRequest.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        employeeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        departmentId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
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
        modelName: 'Request',
        tableName: 'requests',
        timestamps: true,
    });
    return WorkRequest;
}
