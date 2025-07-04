import { StatusCodes } from 'http-status-codes';
import { AirplaneRepository, SeatRepository } from '../repositories';
import { ISeat } from '../schemas/seat/seat.schema';
import { AppError } from '../utils';
import { Airplane } from '../models';

const seatRepository = new SeatRepository();
const airplaneRepsitory = new AirplaneRepository();

async function createSeat(data: ISeat) {
    const airplane = await airplaneRepsitory.findOne({where: {id: data.airplaneId}});
    if(!airplane) {
        throw new AppError(StatusCodes.NOT_FOUND, "Error when Creating the seat.", "The airplane with the given id is not found.")
    }

    const response = await seatRepository.create(data);
    return response;
}

async function findSeats() {
    const response = await seatRepository.find({include: {model: Airplane, as: 'airplane'}});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No Seat Found.");
    }
    return response;
}

async function findSeat (id: number) {
    const response = await seatRepository.findOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No Seat Found With The Given Id.");
    }
    return response;
}

async function updateSeat (data: Partial<ISeat>, id: number) {
    const response = await seatRepository.update(data, {where: {id: id}, returning: true});
    if(response[0] === 0) {
        throw new AppError(404, "Not Found", "Update Failed: No Seat Found With The Given Id.");
    }
    return response[1];
}

async function deleteSeat (id: number) {
    const response = await seatRepository.delete({where: {id: id}});
    if(response === 0) {
        throw new AppError(404, "Not Found", "Deletion Failed: No Seat Found With The Given Id.");
    }
    return response;
}

const SeatService = {
    createSeat,
    findSeats,
    findSeat,
    updateSeat,
    deleteSeat
}

export default SeatService