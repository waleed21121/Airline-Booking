import { sign, verify } from "jsonwebtoken";
import { envVariables } from "../../config";
import { User } from "../../models";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";

async function accessTokenGenerator (payload: Partial<User>) {
    const token = await sign(payload, envVariables.PRIVATE_KEY, {
        expiresIn: '1h',
        algorithm: "RS256"
    });
    return token;
}

async function refreshTokenGenerator (payload: Partial<User>) {
    const token = await sign(payload, envVariables.PRIVATE_KEY, {
        expiresIn: '1d',
        algorithm: "RS256"
    });
    return token;
}

async function verifyToken (bearerToken: string) {
    try {

        const token = bearerToken.split(' ')[1];
        const payload = await verify(token, envVariables.PUBLIC_KEY, {
            algorithms: ["RS256"]
        });

        return payload;

    } catch (error) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Error validating the token.", "Invalid token.")
    }
}

const JWT = {
    accessTokenGenerator,
    refreshTokenGenerator,
    verifyToken
}

export default JWT