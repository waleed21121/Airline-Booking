import { NextFunction, Request, Response } from "express";
import { IAirplane } from "../schemas/airplane.schema";
import { AirplaneService } from "../services";
import { IAirplaneResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";

async function createAirplane (req: Request<{}, {}, IAirplane, {}, {}>, res: Response<IAirplaneResponse, {}>, next: NextFunction) {
    // Error handling coming soon ...
    try {
        const airplane = await AirplaneService.createAirplane(req.body);
        res.status(StatusCodes.CREATED).send({
            success: true,
            message: 'Successfully created an airplane',
            data: airplane,
            error: null
        })
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: true,
            message: 'Something went wrong creating an airplane',
            data: null,
            error: error
        })
    }
}


const AirplaneController = {
    createAirplane
}

export default AirplaneController