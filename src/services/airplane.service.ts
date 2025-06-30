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

const AirplaneService = {
    createAirplane,
    findAirplanes
}

export default AirplaneService