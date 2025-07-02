import { NextFunction, Request, Response } from "express";
import { AirportService } from "../services";
import { IAirportResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostAirport, TUpdateAirport } from "../validators/airport.validator";
import { TIdValidator } from '../validators/id.validator'

const createAirport: TPostAirport = async (req, res: Response<IAirportResponse>, next: NextFunction) => {
    const airport = await AirportService.createAirport(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created an airport',
        data: airport,
        error: null
    })
}

const findAirports = async (req:Request, res: Response<IAirportResponse>, next: NextFunction) => {
    const airports = await AirportService.findAirports();
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found airports',
        data: airports,
        error: null
    })
}

const findAirport: TIdValidator = async (req, res: Response<IAirportResponse>, next) => {
    const airport = await AirportService.findAirport(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found airport',
        data: airport,
        error: null
    })
}

const updateAirport: TUpdateAirport = async (req, res: Response<IAirportResponse>, next) => {
    const airport = await AirportService.updateAirport(req.body, req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Updated Airport',
        data: airport,
        error: null
    })
}

const deleteAirport: TIdValidator = async (req, res: Response<IAirportResponse>, next) => {
    await AirportService.deleteAirport(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted Airport',
        data: null,
        error: null
    })
}

const AirportController = {
    createAirport,
    findAirports,
    findAirport,
    updateAirport,
    deleteAirport
}

export default AirportController