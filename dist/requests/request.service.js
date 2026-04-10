"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestService = void 0;
const db_1 = require("../_helpers/db");
exports.requestService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
async function getAll() {
    return await db_1.db.Request.findAll();
}
async function getById(id) {
    return await getRequest(id);
}
async function create(params) {
    await validateRelations(params.employeeId, params.departmentId);
    await db_1.db.Request.create({
        ...params,
        status: params.status || 'pending',
    });
}
async function update(id, params) {
    const request = await getRequest(id);
    const employeeId = params.employeeId ?? request.employeeId;
    const departmentId = params.departmentId ?? request.departmentId;
    await validateRelations(employeeId, departmentId);
    await request.update(params);
}
async function _delete(id) {
    const request = await getRequest(id);
    await request.destroy();
}
async function getRequest(id) {
    const request = await db_1.db.Request.findByPk(id);
    if (!request) {
        throw new Error('Request not found');
    }
    return request;
}
async function validateRelations(employeeId, departmentId) {
    const employee = await db_1.db.Employee.findByPk(employeeId);
    if (!employee) {
        throw new Error('Employee not found');
    }
    const department = await db_1.db.Department.findByPk(departmentId);
    if (!department) {
        throw new Error('Department not found');
    }
    if (employee.departmentId !== departmentId) {
        throw new Error('Employee does not belong to the specified department');
    }
}
