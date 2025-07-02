import { Airport } from "../../models";

export default interface IAirportResponse {
    success: boolean;
    message: string;
    data: Airport | Airport[] | null;
    error: Error | null;
}