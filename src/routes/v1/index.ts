import { Router } from 'express';
import airplaneRouter from './airplane.route';
import cityRouter from './city.route';

const v1Router = Router();

v1Router.use('/airplanes', airplaneRouter);
v1Router.use('/cities', cityRouter);

export default v1Router;