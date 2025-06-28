import { Airplane } from "../../models";

export default interface IAirplaneResponse {
    success: boolean;
    message: string;
    data: Airplane | Airplane[] | null;
    error: Error | null;
}