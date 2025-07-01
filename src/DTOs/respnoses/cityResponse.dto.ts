import { City } from "../../models";

export default interface ICityResponse {
    success: boolean;
    message: string;
    data: City | City[] | null;
    error: Error | null;
}