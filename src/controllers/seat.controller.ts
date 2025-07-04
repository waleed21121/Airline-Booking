import { NextFunction, Request, Response } from "express";
import { SeatService } from "../services";
import { StatusCodes } from "http-status-codes";
import { TIdValidator } from '../validators/id.validator'
import { TPostSeat, TUpdateSeat } from "../validators/seat.validators";
import { ISeatResponse } from "../DTOs";

const createSeat: TPostSeat = async (req, res: Response<ISeatResponse>, next: NextFunction) => {
    const seat = await SeatService.createSeat(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a seat',
        data: seat,
        error: null
    })
}

const findSeats = async (req:Request, res: Response<ISeatResponse>, next: NextFunction) => {
    const seats = await SeatService.findSeats();
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found seats',
        data: seats,
        error: null
    })
}

const findSeat: TIdValidator = async (req, res: Response<ISeatResponse>, next) => {
    const seat = await SeatService.findSeat(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found seat',
        data: seat,
        error: null
    })
}

const updateSeat: TUpdateSeat = async (req, res: Response<ISeatResponse>, next) => {
    const seat = await SeatService.updateSeat(req.body, req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Updated seat',
        data: seat,
        error: null
    })
}

const deleteSeat: TIdValidator = async (req, res: Response<ISeatResponse>, next) => {
    await SeatService.deleteSeat(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted Seat',
        data: null,
        error: null
    })
}

const SeatController = {
    createSeat,
    findSeats,
    findSeat,
    updateSeat,
    deleteSeat
}

export default SeatController