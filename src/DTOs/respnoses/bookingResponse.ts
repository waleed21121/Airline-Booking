import { Booking } from "../../models";

export default interface IBookingResponse {
    success: boolean;
    message: string;
    data: Booking | Booking[] | null;
    error: Error | null;
}