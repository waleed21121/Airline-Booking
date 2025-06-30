import { AirplaneRepository } from '../repositories';
import { IAirplane } from '../schemas/airplane.schema';
import { AppError } from '../utils';

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data: IAirplane) {
    const response = await airplaneRepository.create(data);
    return response;
}

async function findAirplanes() {
    const response = await airplaneRepository.find({});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No Airplane Found.");
    }
    return response;
}

async function findAirplane (id: number) {
    const response = await airplaneRepository.findOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No Airplane Found With The Given Id.");
    }
    return response;
}

const AirplaneService = {
    createAirplane,
    findAirplanes,
    findAirplane
}

export default AirplaneService