import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface FlightAttributes {
  id: number,
  flightNumber: string,
  airplaneId: number,
  departureAirportId: string,
  arrivalAirportId: string,
  arrivalTime: Date,
  departureTime: Date,
  price: number,
  boardingGate: string,
  totalSeats: number,
  createdAt: Date,
  updatedAt: Date
}

export class Flight extends Model<FlightAttributes, Partial<FlightAttributes>> implements FlightAttributes {
  id!: number;
  flightNumber!: string;
  airplaneId!: number;
  departureAirportId!: string;
  arrivalAirportId!: string;
  arrivalTime!: Date;
  departureTime!: Date;
  price!: number;
  boardingGate!: string;
  totalSeats!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Flight {
    return Flight.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      boardingGate: {
        type: DataTypes.STRING
      },
      totalSeats: {
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
      modelName: 'Flight',
    });
  }
}