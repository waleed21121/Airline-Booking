import { StatusCodes } from 'http-status-codes';
import { sequelize } from '../models';
import { BookingRepository, FlightRepository } from '../repositories';
import { IBooking } from '../schemas/booking/booking.schema';
import { AppError } from '../utils';

const bookingRepository = new BookingRepository();
const flightRepository = new FlightRepository();

async function createBooking(data: IBooking) {
    const transaction = await sequelize.transaction();

    const flight = await flightRepository.findOne({where: {id: data.flightId}});
    if(!flight) {
        transaction.rollback();
        throw new AppError(StatusCodes.NOT_FOUND, "Error creating the booking.", "The flight with the given id is not found.")
    }
    if(data.noOfSeats > flight.totalSeats) {
        transaction.rollback();
        throw new AppError(StatusCodes.BAD_REQUEST, "Error creating the booking.", "Not enough available seats.")
    }

    const totalBillingAmount = data.noOfSeats * flight.price;

    const bookingPayload = {
        flightId: data.flightId,
        status: 'initiated',
        noOfSeats: data.noOfSeats,
        userId: data.userId,
        totalCost: totalBillingAmount
    }

    const booking = await bookingRepository.createWithTransaction(bookingPayload, transaction);

    await flightRepository.updateFlightSeats(flight, data.noOfSeats, true);

    await transaction.commit();
    return booking;
}


const BookingService = {
    createBooking
}

export default BookingService