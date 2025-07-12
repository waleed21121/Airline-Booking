import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories';
import { IUser } from '../schemas/user/user.schema';
import { AppError } from '../utils';
import { JWT } from '../utils';
import { ILoginUser } from '../schemas/user/loginUser.schema';
import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../config/sendEmail.config';
import { IVerifyUser } from '../schemas/user/verifyUser.schema';

const userRepository = new UserRepository();

async function createUser(data: IUser) {
    const user = await userRepository.findOne({where: {email: data.email}});
    if(user && user.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error Creating a user.", "The email is already registered.")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verifyToken = await crypto.randomBytes(64).toString('hex');

    if(user && !user.isVerified) {
        const updatedUser = await userRepository.update({
            password: hashedPassword,
            verifyToken: verifyToken
        }, {
            where: {email: data.email},
            returning: true
        });
        
        sendVerificationEmail(user.email, verifyToken);

        return updatedUser[1];
    }
    
    const userPayload: IUser = {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: 'user',
        isVerified: false,
        verifyToken: verifyToken
    }

    sendVerificationEmail(data.email, verifyToken);
    const response = await userRepository.create(userPayload);
    return response;
}

async function loginUser (data: ILoginUser) {
    const user = await userRepository.findOne({where: {email: data.email}});
    if(!user) {
        throw new AppError(404, "Not Found", "No User Found, Please Register First.");
    }

    if(!user.isVerified) {
        throw new AppError(StatusCodes.FORBIDDEN, "Error login the user", "Please verify your account with verification link.")
    }
    
    const match = await bcrypt.compare(data.password, user.password);
    if(!match) {
        throw new AppError(StatusCodes.FORBIDDEN, "Error login the user", "The given password doesn't match the actual password.");
    }

    const userPayload = {
        email: user.email,
        isVerfied: user.isVerified
    }
    const accessToken = await JWT.accessTokenGenerator(userPayload);
    const refreshToken = await JWT.refreshTokenGenerator(userPayload);
    
    return {
        accessToken,
        refreshToken
    };
}

async function verifyUser (user: IVerifyUser) {
    const userToVerify = await userRepository.findOne({where: {email: user.email}});
    if(!userToVerify) {
        throw new AppError(404, "Not Found", "No User Found.");
    }

    if(userToVerify.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error verifing the user", "This email is already verified.");
    }

    if(user.token !== userToVerify.verifyToken) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error verifing the user", "the tokens doesn't match, please try register again.");
    }

    const updatedUser = await userRepository.update({
        isVerified: true
    }, {
        where: {email: user.email},
        returning: true
    })
    return updatedUser[1];
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
    let userPayload: Partial<IUser> = {} 
    if(data.username) {
        userPayload.username = data.username;
    }
    if(data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        userPayload.password = hashedPassword;
    }

    const response = await userRepository.update(userPayload, {where: {id: id}, returning: true});
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
    deleteUser,
    loginUser,
    verifyUser
}

export default UserService