import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CityAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class City extends Model<CityAttributes, Partial<CityAttributes>> implements CityAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel (sequelize: Sequelize): typeof City {
    return City.init({
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
        modelName: 'City',
    })
  }
};