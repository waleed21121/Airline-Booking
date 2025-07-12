import { User } from "../../models";

export interface IUserResponse {
    success: boolean;
    message: string;
    data: User | User[] | null;
    error: Error | null;
}

export interface IUserAuthResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
    error: Error | null;
}