import { db } from '../_helpers/db';
import { WorkRequest, RequestCreationAttributes } from './request.model';

export const requestService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<WorkRequest[]> {
  return await db.Request.findAll();
}

async function getById(id: number): Promise<WorkRequest> {
  return await getRequest(id);
}

async function create(params: RequestCreationAttributes): Promise<void> {
  await validateRelations(params.employeeId, params.departmentId);

  await db.Request.create({
    ...params,
    status: params.status || 'pending',
  });
}

async function update(id: number, params: Partial<RequestCreationAttributes>): Promise<void> {
  const request = await getRequest(id);

  const employeeId = params.employeeId ?? request.employeeId;
  const departmentId = params.departmentId ?? request.departmentId;
  await validateRelations(employeeId, departmentId);

  await request.update(params);
}

async function _delete(id: number): Promise<void> {
  const request = await getRequest(id);
  await request.destroy();
}

async function getRequest(id: number): Promise<WorkRequest> {
  const request = await db.Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }

  return request;
}

async function validateRelations(employeeId: number, departmentId: number): Promise<void> {
  const employee = await db.Employee.findByPk(employeeId);
  if (!employee) {
    throw new Error('Employee not found');
  }

  const department = await db.Department.findByPk(departmentId);
  if (!department) {
    throw new Error('Department not found');
  }

  if (employee.departmentId !== departmentId) {
    throw new Error('Employee does not belong to the specified department');
  }
}
