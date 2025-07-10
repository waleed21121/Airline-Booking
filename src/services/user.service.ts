import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories';
import { IUser } from '../schemas/user/user.schema';
import { AppError } from '../utils';
import { JWT } from '../utils';

import * as bcrypt from 'bcrypt';

const userRepository = new UserRepository();

async function createUser(data: IUser) {
    const user = await userRepository.findOne({where: {email: data.email}});
    if(user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error Creating a user.", "The email is already registered.")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verifyToken = await JWT.accessTokenGenerator({
        email: data.email,
        isVerified: false
    })

    const userPayload: IUser = {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: 'user',
        isVerified: false,
        verifyToken: verifyToken
    }
    const response = await userRepository.create(userPayload);
    return response;
}

async function findUsers() {
    const response = await userRepository.find({});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No User Found.");
    }
    return response;
}

async function findUser (id: number) {
    const response = await userRepository.findOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No User Found With The Given Id.");
    }
    return response;
}

async function updateUser (data: Partial<IUser>, id: number) {
    const response = await userRepository.update(data, {where: {id: id}, returning: true});
    if(response[0] === 0) {
        throw new AppError(404, "Not Found", "Update Failed: No User Found With The Given Id.");
    }
    return response[1];
}

async function deleteUser (id: number) {
    const response = await userRepository.delete({where: {id: id}});
    if(response === 0) {
        throw new AppError(404, "Not Found", "Deletion Failed: No User Found With The Given Id.");
    }
    return response;
}

const UserService = {
    createUser,
    findUser,
    findUsers,
    updateUser,
    deleteUser
}

export default UserService