"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const db_1 = require("../_helpers/db");
exports.employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
async function getAll() {
    return await db_1.db.Employee.findAll();
}
async function getById(id) {
    return await getEmployee(id);
}
async function create(params) {
    const existingEmployee = await db_1.db.Employee.findOne({ where: { email: params.email } });
    if (existingEmployee) {
        throw new Error(`Employee email "${params.email}" already exists`);
    }
    const department = await db_1.db.Department.findByPk(params.departmentId);
    if (!department) {
        throw new Error('Department not found');
    }
    await db_1.db.Employee.create(params);
}
async function update(id, params) {
    const employee = await getEmployee(id);
    if (params.departmentId !== undefined) {
        const department = await db_1.db.Department.findByPk(params.departmentId);
        if (!department) {
            throw new Error('Department not found');
        }
    }
    await employee.update(params);
}
async function _delete(id) {
    const employee = await getEmployee(id);
    await employee.destroy();
}
async function getEmployee(id) {
    const employee = await db_1.db.Employee.findByPk(id);
    if (!employee) {
        throw new Error('Employee not found');
    }
    return employee;
}
