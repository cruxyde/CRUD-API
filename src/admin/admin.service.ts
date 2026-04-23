import { db } from '../_helpers/db';

type AdminAccountUpdate = {
  username?: string;
  role?: string;
};

type AdminRequestStatus = 'pending' | 'approved' | 'rejected';

export const adminService = {
  getAllAccounts,
  updateAccount,
  deleteAccount,
  getAllRequests,
  updateRequestStatus,
};

async function getAllAccounts(): Promise<
  Array<{
    id: number;
    username: string;
    role: string;
    created_at: Date;
  }>
> {
  const users = await db.User.findAll({
    attributes: ['id', 'email', 'role', 'createdAt'],
  });

  return users.map((user: { id: number; email: string; role: string; createdAt: Date }) => ({
    id: user.id,
    username: user.email,
    role: user.role,
    created_at: user.createdAt,
  }));
}

async function updateAccount(id: number, data: AdminAccountUpdate): Promise<{ message: string }> {
  const updateData: { email?: string; role?: string } = {};

  if (data.username) updateData.email = data.username;
  if (data.role) updateData.role = data.role;

  const [affectedRows] = await db.User.update(updateData, { where: { id } });
  if (affectedRows === 0) {
    throw new Error('Account not found');
  }

  return { message: 'Account updated successfully' };
}

async function deleteAccount(id: number): Promise<{ message: string }> {
  const deletedRows = await db.User.destroy({ where: { id } });
  if (deletedRows === 0) {
    throw new Error('Account not found');
  }

  return { message: 'Account deleted successfully' };
}

async function getAllRequests(): Promise<
  Array<{
    id: number;
    employeeId: number;
    departmentId: number;
    type: string;
    description: string;
    status: string;
    created_at: Date;
    employee: { id: number; firstName: string; lastName: string; email: string } | null;
    department: { id: number; name: string } | null;
  }>
> {
  const requests = await db.Request.findAll({
    include: [
      {
        model: db.Employee,
        as: 'employee',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      {
        model: db.Department,
        as: 'department',
        attributes: ['id', 'name'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  return requests.map(
    (request: {
      id: number;
      employeeId: number;
      departmentId: number;
      type: string;
      description: string;
      status: string;
      createdAt: Date;
      employee?: { id: number; firstName: string; lastName: string; email: string };
      department?: { id: number; name: string };
    }) => ({
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
    })
  );
}

async function updateRequestStatus(id: number, status: AdminRequestStatus): Promise<{ message: string }> {
  const [affectedRows] = await db.Request.update({ status }, { where: { id } });
  if (affectedRows === 0) {
    throw new Error('Request not found');
  }

  return { message: 'Request status updated successfully' };
}
