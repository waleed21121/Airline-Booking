import { CityRepository } from '../repositories';
import { ICity } from '../schemas/city/city.schema';
import { AppError } from '../utils';

const cityRepository = new CityRepository();

async function createCity(data: ICity) {
    const response = await cityRepository.create(data);
    return response;
}

async function findCities() {
    const response = await cityRepository.find({});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No City Found.");
    }
    return response;
}

async function findCity (id: number) {
    const response = await cityRepository.findOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No City Found With The Given Id.");
    }
    return response;
}

async function updateCity (data: Partial<ICity>, id: number) {
    const response = await cityRepository.update(data, {where: {id: id}, returning: true});
    if(response[0] === 0) {
        throw new AppError(404, "Not Found", "Update Failed: No City Found With The Given Id.");
    }
    return response[1];
}

async function deleteCity (id: number) {
    const response = await cityRepository.delete({where: {id: id}});
    if(response === 0) {
        throw new AppError(404, "Not Found", "Deletion Failed: No City Found With The Given Id.");
    }
    return response;
}

const CityService = {
    createCity,
    findCities,
    findCity,
    updateCity,
    deleteCity
}

export default CityService