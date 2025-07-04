import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Airplane } from './airplane';

export interface SeatAttributes {
  id: number;
  airplaneId: number;
  row: number;
  col: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  airplane?: Airplane;
}

export class Seat extends Model<SeatAttributes, Partial<SeatAttributes>> implements SeatAttributes {
  id!: number;
  airplaneId!: number;
  row!: number;
  col!: string;
  type!: string;
  createdAt!: Date;
  updatedAt!: Date;
  airplane?: Airplane | undefined;

  static initModel(sequelize: Sequelize): typeof Seat {
    return Seat.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      row: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        values: ['business', 'economy', 'premium-economy', 'first-class'],
        defaultValue: 'economy'
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
      modelName: 'Seat',
    })
  }
}