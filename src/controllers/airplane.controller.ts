import { NextFunction, Request, Response } from "express";
import { AirplaneService } from "../services";
import { IAirplaneResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostAirplane, TUpdateAirplane } from "../validators/airplane.validators";
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
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found airplanes',
        data: airplanes,
        error: null
    })
}

const findAirplane: TIdValidator = async (req, res: Response<IAirplaneResponse>, next) => {
    const airplanes = await AirplaneService.findAirplane(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found airplanes',
        data: airplanes,
        error: null
    })
}

const updateAirplane: TUpdateAirplane = async (req, res: Response<IAirplaneResponse>, next) => {
    const airplane = await AirplaneService.updateAirplane(req.body, req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Updated Airplane',
        data: airplane,
        error: null
    })
}

const deleteAirplane: TIdValidator = async (req, res: Response<IAirplaneResponse>, next) => {
    await AirplaneService.deleteAirplane(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted Airplane',
        data: null,
        error: null
    })
}

const AirplaneController = {
    createAirplane,
    findAirplanes,
    findAirplane,
    updateAirplane,
    deleteAirplane
}

export default AirplaneController