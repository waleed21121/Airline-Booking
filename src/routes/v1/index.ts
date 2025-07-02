import { Router } from 'express';
import airplaneRouter from './airplane.route';
import cityRouter from './city.route';
import airportRouter from './airport.route';
import flightRouter from './flight.route';

const v1Router = Router();

v1Router.use('/airplanes', airplaneRouter);
v1Router.use('/cities', cityRouter);
v1Router.use('/airports', airportRouter);
v1Router.use('/flights', flightRouter);

export default v1Router;