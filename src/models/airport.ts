import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface AirportAttributes {
  id: number;
  name: string;
  code: string;
  address: string;
  cityID: number;
  createdAt: Date;
  updatedAt: Date;
}
export class Airport extends Model<AirportAttributes, Partial<AirportAttributes>> implements AirportAttributes {
  id!: number;
  name!: string;
  code!: string;
  address!: string;
  cityID!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Airport {
  return Airport.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        unique: true
      },
      cityID: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      modelName: 'Airport',
    });
  }
}

