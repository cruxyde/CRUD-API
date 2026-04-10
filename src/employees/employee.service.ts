import { db } from '../_helpers/db';
import { Employee, EmployeeCreationAttributes } from './employee.model';

export const employeeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<Employee[]> {
  return await db.Employee.findAll();
}

async function getById(id: number): Promise<Employee> {
  return await getEmployee(id);
}

async function create(params: EmployeeCreationAttributes): Promise<void> {
  const existingEmployee = await db.Employee.findOne({ where: { email: params.email } });
  if (existingEmployee) {
    throw new Error(`Employee email "${params.email}" already exists`);
  }

  const department = await db.Department.findByPk(params.departmentId);
  if (!department) {
    throw new Error('Department not found');
  }

  await db.Employee.create(params);
}

async function update(id: number, params: Partial<EmployeeCreationAttributes>): Promise<void> {
  const employee = await getEmployee(id);

  if (params.departmentId !== undefined) {
    const department = await db.Department.findByPk(params.departmentId);
    if (!department) {
      throw new Error('Department not found');
    }
  }

  await employee.update(params);
}

async function _delete(id: number): Promise<void> {
  const employee = await getEmployee(id);
  await employee.destroy();
}

async function getEmployee(id: number): Promise<Employee> {
  const employee = await db.Employee.findByPk(id);
  if (!employee) {
    throw new Error('Employee not found');
  }

  return employee;
}
