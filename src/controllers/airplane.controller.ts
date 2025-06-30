import { NextFunction, Request, Response } from "express";
import { IAirplane } from "../schemas/airplane.schema";
import { AirplaneService } from "../services";
import { IAirplaneResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostAirplane } from "../validators/airplane.validators";
import { TIdValidator } from '../validators/id.validator'

const createAirplane: TPostAirplane = async (req, res: Response<IAirplaneResponse>, next: NextFunction) => {
    const airplane = await AirplaneService.createAirplane(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created an airplane',
        data: airplane,
        error: null
    })
}

const findAirplanes = async (req:Request, res: Response<IAirplaneResponse>, next: NextFunction) => {
    const airplanes = await AirplaneService.findAirplanes();
    res.status(200).send({
        success: true,
        message: 'Successfully found airplanes',
        data: airplanes,
        error: null
    })
}

const findAirplane: TIdValidator = async (req, res: Response<IAirplaneResponse>, next) => {
    const airplanes = await AirplaneService.findAirplane(req.params.id);
    res.status(200).send({
        success: true,
        message: 'Successfully found airplanes',
        data: airplanes,
        error: null
    })
}

const AirplaneController = {
    createAirplane,
    findAirplanes,
    findAirplane
}

export default AirplaneController