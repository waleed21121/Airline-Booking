import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Flight } from './flight';

export interface BookingAttributes {
  id: number;
  flightId: number;
  userId: number;
  status: string;
  totalCost: number;
  noOfSeats: number;
  createdAt: Date;
  updatedAt: Date;
  flight?: Flight;
}


export class Booking extends Model<BookingAttributes, Partial<BookingAttributes>> implements BookingAttributes {
  id!: number;
  flightId!: number;
  userId!: number;
  status!: string;
  totalCost!: number;
  noOfSeats!: number;
  createdAt!: Date;
  updatedAt!: Date;
  flight?: Flight | undefined;

  static initModel(sequelize:Sequelize): typeof Booking {
    return Booking.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      status: {
        type: DataTypes.STRING,
        values: ['booked', 'cncelled', 'initiated', 'pending'],
        defaultValue: 'initiated',
        allowNull: false
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 1
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
      modelName: 'Booking',
    })
  }
}
