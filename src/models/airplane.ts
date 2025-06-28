import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface AirplaneAttributes {
  modelNumber: string;
  capacity: number;
}

export class Airplane extends Model<AirplaneAttributes, Partial<AirplaneAttributes>> implements AirplaneAttributes {
    modelNumber!: string;
    capacity!: number;
    
    static initModel(sequelize: Sequelize): typeof Airplane {
      return Airplane.init({
        modelNumber: {
          type: DataTypes.STRING,
          allowNull: false
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
        sequelize,
        modelName: 'Airplane',
      });
    }
  }