import { AirportRepository } from '../repositories';
import { IAirport } from '../schemas/airport/airport.schema';
import { AppError } from '../utils';
import { CityRepository } from '../repositories';

const airportRepository = new AirportRepository();
const cityRepository = new CityRepository();

async function createAirport(data: IAirport) {
    const city = await cityRepository.findOne({where: {id: data.cityID}});
    if(!city) {
        throw new AppError(404, "Not Found", `The city with id ${data.cityID} is not found.`);
    }

    const response = await airportRepository.create(data);
    return response;
}

async function findAirports() {
    const response = await airportRepository.find({});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No Airport Found.");
    }
    return response;
}

async function findAirport (id: number) {
    const response = await airportRepository.findOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No Airport Found With The Given Id.");
    }
    return response;
}

async function updateAirport (data: Partial<IAirport>, id: number) {
    const response = await airportRepository.update(data, {where: {id: id}, returning: true});
    if(response[0] === 0) {
        throw new AppError(404, "Not Found", "Update Failed: No Airport Found With The Given Id.");
    }
    return response[1];
}

async function deleteAirport (id: number) {
    const response = await airportRepository.delete({where: {id: id}});
    if(response === 0) {
        throw new AppError(404, "Not Found", "Deletion Failed: No Airport Found With The Given Id.");
    }
    return response;
}

const AirportService = {
    createAirport,
    findAirports,
    findAirport,
    updateAirport,
    deleteAirport
}

export default AirportService