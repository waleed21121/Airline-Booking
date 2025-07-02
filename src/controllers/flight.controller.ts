import { NextFunction, Request, Response } from "express";
import { FlightService } from "../services";
import { StatusCodes } from "http-status-codes";
import { TPostFlight } from "../validators/flight.validators";
import { IFlightResponse } from "../DTOs";

const createFlight: TPostFlight = async (req, res: Response<IFlightResponse>, next: NextFunction) => {
    const flight = await FlightService.createFlight(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a flight',
        data: flight,
        error: null
    })
}

const FlightController = {
    createFlight,
}

export default FlightController