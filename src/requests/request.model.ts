import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface RequestAttributes {
  id: number;
  employeeId: number;
  departmentId: number;
  type: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestCreationAttributes
  extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

export class WorkRequest
  extends Model<RequestAttributes, RequestCreationAttributes>
  implements RequestAttributes
{
  public id!: number;
  public employeeId!: number;
  public departmentId!: number;
  public type!: string;
  public description!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof WorkRequest {
  WorkRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Request',
      tableName: 'requests',
      timestamps: true,
    }
  );

  return WorkRequest;
}
