import CrudRepository from "./crud.repository";
import { Flight } from "../models";
import { addRowLockForUpdate } from "./queries/flightRawQueries";
import { sequelize } from "../models";

export default class FlightRepository extends CrudRepository<Flight> {
    constructor() {
        super(Flight);
    }

    async updateFlightSeats(flight: Flight, seats: number, dec: boolean = true): Promise<Flight> {
        await sequelize.query(addRowLockForUpdate(flight.id));
        let updatedFlight;
        if(dec) {
            updatedFlight = await flight.decrement('totalSeats', {by: seats});
        } else {
            updatedFlight = await flight.increment('totalSeats', {by: seats});
        }
        return updatedFlight;
    }
}