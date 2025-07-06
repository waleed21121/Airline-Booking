import { Router } from 'express';
import airplaneRouter from './airplane.route';
import cityRouter from './city.route';
import airportRouter from './airport.route';
import flightRouter from './flight.route';
import seatRouter from './seat.route';
import bookingRouter from './booking.route';

const v1Router = Router();

v1Router.use('/airplanes', airplaneRouter);
v1Router.use('/cities', cityRouter);
v1Router.use('/airports', airportRouter);
v1Router.use('/flights', flightRouter);
v1Router.use('/seats', seatRouter);
v1Router.use('/bookings', bookingRouter)

export default v1Router;