import { StatusCodes } from 'http-status-codes';
import { Flight, sequelize } from '../models';
import { BookingRepository, FlightRepository } from '../repositories';
import { IBooking } from '../schemas/booking/booking.schema';
import { AppError, flightKeyById } from '../utils';
import { IPyament } from '../schemas/booking/payment.schema';
import { Op } from 'sequelize';
import RedisService from './redis.service';

const bookingRepository = new BookingRepository();
const flightRepository = new FlightRepository();

async function createBooking(data: IBooking) {
    const transaction = await sequelize.transaction();
    try {
        const flight = await flightRepository.findOne({ 
            where: {id: data.flightId},
            transaction: transaction,
            lock: transaction.LOCK.UPDATE
        });
    
        if(!flight) {
            throw new AppError(StatusCodes.NOT_FOUND, "Error creating the booking.", "The flight with the given id is not found.")
        }
        if(data.noOfSeats > flight.totalSeats) {
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

        const updatedFlight = await flightRepository.updateFlightSeats(flight, data.noOfSeats, true, transaction);

        await transaction.commit();

        // Update Cache
        const key = flightKeyById(flight.id);
        let cachedData = await RedisService.getJson(key) as Flight;
        cachedData.totalSeats = updatedFlight.totalSeats;
        await RedisService.setJson(key, cachedData);

        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

async function makePayment(data: IPyament) {
    const transaction = await sequelize.transaction();
    try {

        const bookingDetails = await bookingRepository.findOne({where: {id: data.bookingId}, transaction: transaction});

        if(!bookingDetails) {
            throw new AppError(StatusCodes.NOT_FOUND, "Error completeing the payment", "The booking with the given id is not found.")
        }

        if(bookingDetails.status === 'cncelled') {
            throw new AppError(StatusCodes.BAD_REQUEST, "Error completeing the payment", "The booking has expired.")
        }

        const bookingTime = new Date(bookingDetails.createdAt).getTime();
        const currentTime = new Date().getTime();
        if(currentTime - bookingTime > 300000) {
            await cancelBooking(bookingDetails.id);
            throw new AppError(StatusCodes.BAD_REQUEST, "Error completeing the payment", "The booking has expired.")
        }

        if(bookingDetails.totalCost !== data.totalCost) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Error completeing the payment", "The amount of payment doesn't match.");
        }

        if(bookingDetails.userId !== data.userId) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Error completeing the payment", "The user corresponding to the booking doesn't match.");
        }

        // assume the payment is successfull
        const updatedBooking = await bookingRepository.update({
            status: 'booked'
            }, {
                where: {id: bookingDetails.id},
                returning: true,
                transaction: transaction
        });
        await transaction.commit();
        return updatedBooking[1];
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelBooking (bookingId: number) {
    const transaction = await sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.findOne({
            where: {id: bookingId},
            transaction: transaction,
            include: {model: Flight, as: 'flight'}
        });

        if(!bookingDetails) {
            throw new AppError(StatusCodes.NOT_FOUND, "Error cancelling the payment", "The booking with the given id is not found.")
        }

        if(bookingDetails.status === 'cncelled') {
            await transaction.commit();
            return;
        }

        await bookingRepository.update({
            status: 'cncelled'
            }, {
                where: {id: bookingDetails.id},
                returning: true,
                transaction: transaction
        });

        await flightRepository.updateFlightSeats(bookingDetails.flight!, bookingDetails.noOfSeats, false, transaction);
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

async function  cancelOldBookings() {
    const time = new Date(Date.now() - 300000); // 5 minutes ago.
    const response = await bookingRepository.update({
            status: 'cncelled'
        }, {
        where: {
            [Op.and]: [
                {
                    createdAt: {
                        [Op.lt]: time
                    }
                }, {
                    status: {
                        [Op.notIn]: ['cncelled', 'booked']
                    }
                }
            ]
        },
        returning: true
    });
    return response;
}
const BookingService = {
    createBooking,
    makePayment,
    cancelOldBookings
}

export default BookingService