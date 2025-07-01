import { Dialect, Sequelize } from 'sequelize';
import { envVariables } from '../config';
import { Airplane } from "./airplane";
import { City } from './city';
import { Airport } from './airport';


const sequelize = new Sequelize({
  dialect: envVariables.DIALECT as Dialect, 
  host: envVariables.DB_HOST,
  port: envVariables.DB_PORT,
  database: envVariables.DB_NAME,
  username: envVariables.DB_USER,
  password: envVariables.DB_PASSWORD,
  logging: envVariables.NODE_ENV === 'development' ? console.log : false,
});



// Export models and sequelize instance

Airplane.initModel(sequelize);
City.initModel(sequelize);
Airport.initModel(sequelize);

// Run Associations
require('./associations');

export { 
  sequelize,
  Airplane,
  City,
  Airport
};


export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};