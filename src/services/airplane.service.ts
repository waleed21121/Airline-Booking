import { AirplaneRepository } from '../repositories';
import { IAirplane } from '../schemas/airplane.schema';

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data: IAirplane) {
    // error handling is coming soon ...
    try {
        const response = await airplaneRepository.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

const AirplaneService = {
    createAirplane
}

export default AirplaneService