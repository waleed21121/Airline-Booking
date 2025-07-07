import CrudRepository from "./crud.repository";
import { Flight } from "../models";
import { sequelize } from "../models";
import { Transaction } from "sequelize";

export default class FlightRepository extends CrudRepository<Flight> {
    constructor() {
        super(Flight);
    }

    async updateFlightSeats(flight: Flight, seats: number, dec: boolean = true, transaction?: Transaction): Promise<Flight> {
        let myTransaction: Transaction;
        let isCreated: boolean = false;
        if(transaction) {
            myTransaction = transaction
        } else {
            myTransaction = await sequelize.transaction();
            isCreated = true;
        }
        try {
            let updatedFlight;
            if(dec) {
                updatedFlight = await flight.decrement('totalSeats', {by: seats, transaction: myTransaction});
            } else {
                updatedFlight = await flight.increment('totalSeats', {by: seats, transaction: myTransaction});
            }

            if(isCreated) {
                await myTransaction.commit();
            }

            return updatedFlight;
        } catch (error) {
            await myTransaction.rollback();
            throw error;
        }
    }
}