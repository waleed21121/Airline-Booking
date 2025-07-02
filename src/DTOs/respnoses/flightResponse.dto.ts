import { Flight } from "../../models";

export default interface IFlightResponse {
    success: boolean;
    message: string;
    data: Flight | Flight[] | null;
    error: Error | null;
}