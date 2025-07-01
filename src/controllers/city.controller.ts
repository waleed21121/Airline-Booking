import { NextFunction, Request, Response } from "express";
import { CityService } from "../services";
import { StatusCodes } from "http-status-codes";
import { TIdValidator } from '../validators/id.validator'
import { TPostCity, TUpdateCity } from "../validators/city.validators";
import ICityResponse from "../DTOs/respnoses/cityResponse.dto";

const createCity: TPostCity = async (req, res: Response<ICityResponse>, next: NextFunction) => {
    const city = await CityService.createCity(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a city',
        data: city,
        error: null
    })
}

const findCities = async (req:Request, res: Response<ICityResponse>, next: NextFunction) => {
    const cities = await CityService.findCities();
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found cities',
        data: cities,
        error: null
    })
}

const findCity: TIdValidator = async (req, res: Response<ICityResponse>, next) => {
    const city = await CityService.findCity(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully found city',
        data: city,
        error: null
    })
}

const updateCity: TUpdateCity = async (req, res: Response<ICityResponse>, next) => {
    const city = await CityService.updateCity(req.body, req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Updated City',
        data: city,
        error: null
    })
}

const deleteCity: TIdValidator = async (req, res: Response<ICityResponse>, next) => {
    await CityService.deleteCity(req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted City',
        data: null,
        error: null
    })
}

const CityController = {
    createCity,
    findCities,
    findCity,
    updateCity,
    deleteCity
}

export default CityController