import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface AirplaneAttributes {
  id: number;
  modelNumber: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Airplane extends Model<AirplaneAttributes, Partial<AirplaneAttributes>> implements AirplaneAttributes {
    id!: number
    modelNumber!: string;
    capacity!: number;
    createdAt!: Date;
    updatedAt!: Date;
    
    static initModel(sequelize: Sequelize): typeof Airplane {
      return Airplane.init({
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        modelNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isAlphanumeric: true
          }
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 1500
          }
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
        modelName: 'Airplane',
      });
    }
  }