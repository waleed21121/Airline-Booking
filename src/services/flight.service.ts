import { FlightRepository} from '../repositories';
import { IFlight } from '../schemas/flight/flight.schema';
import { AppError } from '../utils';
import { AirplaneRepository, AirportRepository } from '../repositories';

const flightRepository = new FlightRepository();
const airplaneRepository = new AirplaneRepository();
const airportRepository = new AirportRepository();

async function createFlight(data: IFlight) {
    const airplane = await airplaneRepository.findOne({where: {id: data.airplaneId}});
    if(!airplane) {
        throw new AppError(404, "Error when creating flight.", "Airplane with the given id is not found.");
    }

    const departureAirport = await airportRepository.findOne({where: {code: data.departureAirportId}});
    if(!departureAirport) {
        throw new AppError(404, "Error when creating flight.", "Airpot with the given code is not found.");
    }

    const arrivalAirport = await airportRepository.findOne({where: {code: data.arrivalAirportId}});
    if(!arrivalAirport) {
        throw new AppError(404, "Error when creating flight.", "Airpot with the given code is not found.");
    }

    // to check the arrival and departure time dates.

    const flight = await flightRepository.create(data);
    return flight;
}

const FlightService = {
    createFlight
}

export default FlightService;