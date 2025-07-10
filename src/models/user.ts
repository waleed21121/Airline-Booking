import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export class User extends Model<UserAttributes, Partial<UserAttributes>> implements UserAttributes{
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof User {
    return User.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        values: ['user', 'admin'],
        defaultValue: 'user',
        type: DataTypes.STRING      
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      modelName: 'User',
    })
  }
}