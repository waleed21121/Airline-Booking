import { Booking } from "../../models";

export default interface IAirportResponse {
    success: boolean;
    message: string;
    data: Booking | Booking[] | null;
    error: Error | null;
}