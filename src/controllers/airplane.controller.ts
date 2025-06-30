import { NextFunction, Request, Response } from "express";
import { IAirplane } from "../schemas/airplane.schema";
import { AirplaneService } from "../services";
import { IAirplaneResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostAirplane } from "../validators/airplane.validators";

const createAirplane: TPostAirplane = async (req, res: Response<IAirplaneResponse>, next: NextFunction) => {
    const airplane = await AirplaneService.createAirplane(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created an airplane',
        data: airplane,
        error: null
    })
}


const AirplaneController = {
    createAirplane
}

export default AirplaneController