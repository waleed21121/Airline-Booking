import { AirplaneRepository } from '../repositories';
import { IAirplane } from '../schemas/airplane.schema';

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data: IAirplane) {
    const response = await airplaneRepository.create(data);
    return response;
}

const AirplaneService = {
    createAirplane
}

export default AirplaneService