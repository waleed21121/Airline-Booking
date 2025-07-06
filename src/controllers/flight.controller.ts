import { NextFunction, Request, Response } from "express";
import { FlightService } from "../services";
import { StatusCodes } from "http-status-codes";
import { TGetFlights, TPostFlight, TUpdateFlightSeats } from "../validators/flight.validators";
import { IFlightResponse } from "../DTOs";
import { TIdValidator } from "../validators/id.validator";

const createFlight: TPostFlight = async (req, res: Response<IFlightResponse>, next: NextFunction) => {
    const flight = await FlightService.createFlight(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a flight',
        data: flight,
        error: null
    })
}

const findFlights: TGetFlights = async (req, res: Response<IFlightResponse>, next: NextFunction) => {
    const flight = await FlightService.findFlights(req.query);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully found flights.',
        data: flight,
        error: null
    })
}

const findFlight: TIdValidator = async (req, res: Response<IFlightResponse>, next: NextFunction) => {
    const flight = await FlightService.findFlight(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found flight.',
        data: flight,
        error: null        
    })
}

const updateFlightSeats: TUpdateFlightSeats = async (req, res: Response<IFlightResponse>, next: NextFunction) => {
    const flight = await FlightService.updateFlightSeats(req.params.id, req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully updated flight seats.',
        data: flight,
        error: null        
    })
}
const FlightController = {
    createFlight,
    findFlights,
    findFlight,
    updateFlightSeats
}

export default FlightController