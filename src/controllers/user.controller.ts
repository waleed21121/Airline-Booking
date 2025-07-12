import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";
import { IUserResponse, IUserAuthResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TLoginUser, TPostUser, TUpdateUser, TVerifyUser } from "../validators/user.validators";
import { TIdValidator } from '../validators/id.validator'

const createUser: TPostUser = async (req, res: Response<IUserResponse>, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created a user',
        data: user,
        error: null
    })
}

const loginUser: TLoginUser = async (req, res: Response<IUserAuthResponse>, next:NextFunction) => {
    const tokens = await UserService.loginUser(req.body);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully logined a user',
        data: tokens,
        error: null
    })
}

const verifyUser: TVerifyUser = async (req, res: Response<IUserResponse>, next:NextFunction) => {
    const user = await UserService.verifyUser(req.query);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully verified a user',
        data: user,
        error: null
    })
}

const findUsers = async (req:Request, res: Response<IUserResponse>, next: NextFunction) => {
    const users = await UserService.findUsers();
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Found Users',
        data: users,
        error: null
    })
}

const findUser: TIdValidator = async (req, res: Response<IUserResponse>, next) => {
    const user = await UserService.findUser(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Found User',
        data: user,
        error: null
    })
}

const updateUser: TUpdateUser = async (req, res: Response<IUserResponse>, next) => {
    const user = await UserService.updateUser(req.body, req.params.id)
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Updated User',
        data: user,
        error: null
    })
}

const deleteUser: TIdValidator = async (req, res: Response<IUserResponse>, next) => {
    await UserService.deleteUser(req.params.id);
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'Successfully Deleted User',
        data: null,
        error: null
    })
}

const UserController = {
    createUser,
    findUsers,
    findUser,
    updateUser,
    deleteUser,
    loginUser,
    verifyUser
}

export default UserController