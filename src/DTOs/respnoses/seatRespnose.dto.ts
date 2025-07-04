import { Seat } from "../../models";

export default interface ISeatResponse {
    success: boolean;
    message: string;
    data: Seat | Seat[] | null;
    error: Error | null;
}