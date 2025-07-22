import { FlightRepository} from '../repositories';
import { IFlight } from '../schemas/flight/flight.schema';
import { AppError, dateCompare, flightKeyById, flightQueryObject, flightsKey } from '../utils';
import { AirplaneRepository, AirportRepository } from '../repositories';
import { StatusCodes } from 'http-status-codes';
import { IFlightQuery } from '../schemas/query/flightQuery.schema';
import { Airplane, Airport, Flight } from '../models';
import { IUpdateFlightSeats } from '../schemas/flight/updateFlightSeats.schema';
import RedisService from './redis.service';

const flightRepository = new FlightRepository();
const airplaneRepository = new AirplaneRepository();
const airportRepository = new AirportRepository();

async function createFlight(data: IFlight) {
    const airplane = await airplaneRepository.findOne({where: {id: data.airplaneId}});
    if(!airplane) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error when creating flight.", "Airplane with the given id is not found.");
    }

    const departureAirport = await airportRepository.findOne({where: {code: data.departureAirportId}});
    if(!departureAirport) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error when creating flight.", "Airpot with the given code is not found.");
    }

    const arrivalAirport = await airportRepository.findOne({where: {code: data.arrivalAirportId}});
    if(!arrivalAirport) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error when creating flight.", "Airpot with the given code is not found.");
    }

    if(!dateCompare(data.departureTime, data.arrivalTime)) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error when creating flight.", "The arrival time must be greater than the departure time.")
    }

    // Invalidate Cache
    await RedisService.deleteKeys('Airlines:Flights:*');

    const flight = await flightRepository.create(data);
    return flight;
}

async function findFlights(data: IFlightQuery) {
    const filterObject = flightQueryObject(data);

    // Check Cache
    let {where, order} = filterObject;
    const whereJSON = JSON.stringify(where);
    const orderJSON = JSON.stringify(order);
    const key = flightsKey(whereJSON, orderJSON);

    const cachedData = await RedisService.getJson(key);

    if(cachedData) {
        return cachedData as Flight[];
    }

    const flights = await flightRepository.find(filterObject);
    
    if(flights.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error finding and filtering the flights", "flights of the given filters not fount.")
    }

    // Set Cache
    await RedisService.setJson(key, flights);
    return flights;
}

async function findFlight(id: number) {

    const key = flightKeyById(id);
    const cachedData = await RedisService.getJson(key);
    if(cachedData) {
        return cachedData as Flight;
    }

    const flight = await flightRepository.findOne({
        where: {id: id},
        include: [
            {model: Airport, as: 'departureAirport'},
            {model: Airport, as: 'arrivalAirport'},
            {model: Airplane, as: 'flightAirplane'}
        ]
    });

    if(!flight) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error finding a sepcific flight", "flight with the given id not fount.")
    }

    // Set Cache
    await RedisService.setJson(key, flight);

    return flight;
}

async function updateFlightSeats (id: number, data: IUpdateFlightSeats) {
    const flight = await flightRepository.findOne({where: {id: id}});
    if(!flight) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error finding a sepcific flight", "flight with the given id not fount.")
    }
    const updatedFlight = await flightRepository.updateFlightSeats(flight, data.seats, data.dec);

    // Update Cache
    const key = flightKeyById(id);
    let cachedData = await RedisService.getJson(key) as Flight;
    cachedData.totalSeats = updatedFlight.totalSeats;
    await RedisService.setJson(key, cachedData);
    
    return updatedFlight;
}

const FlightService = {
    createFlight,
    findFlights,
    findFlight,
    updateFlightSeats
}

export default FlightService;