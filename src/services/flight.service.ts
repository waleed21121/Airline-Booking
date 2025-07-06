import { FlightRepository} from '../repositories';
import { IFlight } from '../schemas/flight/flight.schema';
import { AppError, dateCompare, flightQueryObject } from '../utils';
import { AirplaneRepository, AirportRepository } from '../repositories';
import { StatusCodes } from 'http-status-codes';
import { IFlightQuery } from '../schemas/query/flightQuery.schema';
import { Airplane, Airport } from '../models';

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

    const flight = await flightRepository.create(data);
    return flight;
}

async function findFlights(data: IFlightQuery) {
    const filterObject = flightQueryObject(data);

    const flights = await flightRepository.find(filterObject);
    
    if(flights.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error finding and filtering the flights", "flights of the given filters not fount.")
    }

    return flights;
}

async function findFlight(id: number) {
    const flight = flightRepository.findOne({
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
    return flight;
}
const FlightService = {
    createFlight,
    findFlights,
    findFlight
}

export default FlightService;