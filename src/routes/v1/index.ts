import { Router } from 'express';
import airplaneRouter from './airplane.route';

const v1Router = Router();

v1Router.use('/airplanes', airplaneRouter);

export default v1Router;