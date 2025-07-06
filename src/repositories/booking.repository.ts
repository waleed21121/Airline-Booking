import { Optional, Transaction } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { Booking } from "../models";
import { BookingAttributes } from "../models/booking";
import CrudRepository from "./crud.repository";

export default class AirportRepository extends CrudRepository<Booking> {
    constructor () {
        super(Booking)
    }
    async createWithTransaction (data: Optional<Partial<BookingAttributes>, NullishPropertiesOf<Partial<BookingAttributes>>>, transaction: Transaction): Promise<Booking> {
        const booking = await Booking.create(data, {transaction: transaction})
        return booking;
    }
}