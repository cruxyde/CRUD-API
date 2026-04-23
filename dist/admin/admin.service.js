"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const db_1 = require("../_helpers/db");
exports.adminService = {
    getAllAccounts,
    updateAccount,
    deleteAccount,
    getAllRequests,
    updateRequestStatus,
};
async function getAllAccounts() {
    const users = await db_1.db.User.findAll({
        attributes: ['id', 'email', 'role', 'createdAt'],
    });
    return users.map((user) => ({
        id: user.id,
        username: user.email,
        role: user.role,
        created_at: user.createdAt,
    }));
}
async function updateAccount(id, data) {
    const updateData = {};
    if (data.username)
        updateData.email = data.username;
    if (data.role)
        updateData.role = data.role;
    const [affectedRows] = await db_1.db.User.update(updateData, { where: { id } });
    if (affectedRows === 0) {
        throw new Error('Account not found');
    }
    return { message: 'Account updated successfully' };
}
async function deleteAccount(id) {
    const deletedRows = await db_1.db.User.destroy({ where: { id } });
    if (deletedRows === 0) {
        throw new Error('Account not found');
    }
    return { message: 'Account deleted successfully' };
}
async function getAllRequests() {
    const requests = await db_1.db.Request.findAll({
        include: [
            {
                model: db_1.db.Employee,
                as: 'employee',
                attributes: ['id', 'firstName', 'lastName', 'email'],
            },
            {
                model: db_1.db.Department,
                as: 'department',
                attributes: ['id', 'name'],
            },
        ],
        order: [['createdAt', 'DESC']],
    });
    return requests.map((request) => ({
        id: request.id,
        employeeId: request.employeeId,
        departmentId: request.departmentId,
        type: request.type,
        description: request.description,
        status: request.status.toLowerCase(),
        created_at: request.createdAt,
        employee: request.employee
            ? {
                id: request.employee.id,
                firstName: request.employee.firstName,
                lastName: request.employee.lastName,
                email: request.employee.email,
            }
            : null,
        department: request.department
            ? {
                id: request.department.id,
                name: request.department.name,
            }
            : null,
    }));
}
async function updateRequestStatus(id, status) {
    const [affectedRows] = await db_1.db.Request.update({ status }, { where: { id } });
    if (affectedRows === 0) {
        throw new Error('Request not found');
    }
    return { message: 'Request status updated successfully' };
}
