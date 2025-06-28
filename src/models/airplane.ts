import { DataTypes, Model, Sequelize } from 'sequelize';

interface AirplaneAttributes {
  modelNumber: string;
  capacity: number;
}

export default (sequelize: Sequelize) => {
  class Airplane extends Model<AirplaneAttributes, Partial<AirplaneAttributes>> {

  }
  Airplane.init({
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
  return Airplane;
};